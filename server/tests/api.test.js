import request from 'supertest';
import app from '../src/server.js';

describe('The Grand Azure Resort API Test Suite', () => {
  let adminToken = '';
  let testInquiryRef = '';
  let testInquiryId = '';

  test('GET /api/health returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/rooms returns list of published luxury rooms', async () => {
    const res = await request(app).get('/api/rooms');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.rooms)).toBe(true);
    expect(res.body.rooms.length).toBeGreaterThan(0);
    expect(res.body.rooms[0]).toHaveProperty('name');
    expect(res.body.rooms[0]).toHaveProperty('basePrice');
  });

  test('GET /api/rooms/:slug returns valid room details', async () => {
    const res = await request(app).get('/api/rooms/azure-ocean-suite');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.room.name).toBe('The Azure Ocean Suite');
  });

  test('POST /api/inquiries validates required fields and date constraints', async () => {
    const invalidPayload = {
      guestName: 'A', // too short
      email: 'not-an-email',
      phone: '123',
      checkInDate: '2020-01-01', // in past
      checkOutDate: '2020-01-01', // same date
      adults: 0,
      consentPrivacy: false
    };

    const res = await request(app)
      .post('/api/inquiries')
      .send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  const uniqueEmail = `traveler.${Date.now()}@example.com`;

  test('POST /api/inquiries accepts valid inquiry, assigns reference and stores data', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 10);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 14);

    const validPayload = {
      guestName: 'Eleanor Roosevelt',
      email: uniqueEmail,
      phone: '+1 555 432 9876',
      checkInDate: tomorrow.toISOString().split('T')[0],
      checkOutDate: dayAfter.toISOString().split('T')[0],
      adults: 2,
      children: 0,
      preferredRoomName: 'The Azure Ocean Suite',
      roomCount: 1,
      specialRequests: 'Quiet suite on high floor with ocean sunset view please.',
      consentPrivacy: true
    };

    const res = await request(app)
      .post('/api/inquiries')
      .send(validPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.inquiryReference).toMatch(/^AZR-\d{4}-[A-Z0-9]+$/);
    testInquiryRef = res.body.inquiryReference;
  });

  test('POST /api/inquiries rejects immediate duplicate submission', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 10);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 14);

    const duplicatePayload = {
      guestName: 'Eleanor Roosevelt',
      email: uniqueEmail,
      phone: '+1 555 432 9876',
      checkInDate: tomorrow.toISOString().split('T')[0],
      checkOutDate: dayAfter.toISOString().split('T')[0],
      adults: 2,
      children: 0,
      preferredRoomName: 'The Azure Ocean Suite',
      roomCount: 1,
      consentPrivacy: true
    };

    const res = await request(app)
      .post('/api/inquiries')
      .send(duplicatePayload);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  test('Admin routes strictly reject unauthenticated requests', async () => {
    const res = await request(app).get('/api/inquiries/admin');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login succeeds with authorized administrator credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@grandazure.com',
        password: 'AzureAdmin2026!'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe('superadmin');
    adminToken = res.body.token;
  });

  test('Authenticated admin can list, inspect, and update inquiry status', async () => {
    // 1. List inquiries
    const listRes = await request(app)
      .get('/api/inquiries/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(listRes.status).toBe(200);
    expect(listRes.body.inquiries.length).toBeGreaterThan(0);
    const target = listRes.body.inquiries.find(i => i.inquiryReference === testInquiryRef);
    expect(target).toBeDefined();
    testInquiryId = target._id;

    // 2. Update status
    const statusRes = await request(app)
      .patch(`/api/inquiries/admin/${testInquiryId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'Contacted' });

    expect(statusRes.status).toBe(200);
    expect(statusRes.body.inquiry.status).toBe('Contacted');

    // 3. Add internal note
    const noteRes = await request(app)
      .post(`/api/inquiries/admin/${testInquiryId}/notes`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ note: 'Contacted guest via phone; preferred oceanfront upper level.' });

    expect(noteRes.status).toBe(200);
    expect(noteRes.body.inquiry.internalNotes.length).toBeGreaterThan(0);
  });
});
