import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../data/store.json');

// Initial in-memory state structure
const defaultState = {
  rooms: [],
  inquiries: [],
  users: [],
  content: {},
  offers: [],
  activityLogs: []
};

class DataStore {
  constructor() {
    this.state = defaultState;
    this.isLoaded = false;
    this.useMongoose = false;
  }

  init() {
    try {
      if (!fs.existsSync(path.dirname(DATA_FILE))) {
        fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        this.state = JSON.parse(raw);
      } else {
        this.save();
      }
      this.isLoaded = true;
    } catch (err) {
      console.error('DataStore initialization error:', err);
      this.state = { ...defaultState };
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to store.json:', err);
    }
  }

  // --- ROOMS ---
  getRooms(filter = {}) {
    let list = [...(this.state.rooms || [])];
    if (filter.isPublished !== undefined) {
      list = list.filter(r => r.isPublished === filter.isPublished);
    }
    if (filter.isFeatured !== undefined) {
      list = list.filter(r => r.isFeatured === filter.isFeatured);
    }
    if (filter.category) {
      list = list.filter(r => r.category === filter.category);
    }
    list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return list;
  }

  getRoomById(id) {
    return (this.state.rooms || []).find(r => r._id === id || r.slug === id) || null;
  }

  createRoom(data) {
    const newRoom = {
      _id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    if (!this.state.rooms) this.state.rooms = [];
    this.state.rooms.push(newRoom);
    this.save();
    return newRoom;
  }

  updateRoom(id, updateData) {
    const index = (this.state.rooms || []).findIndex(r => r._id === id);
    if (index === -1) return null;
    this.state.rooms[index] = {
      ...this.state.rooms[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.state.rooms[index];
  }

  deleteRoom(id) {
    const before = this.state.rooms.length;
    this.state.rooms = this.state.rooms.filter(r => r._id !== id);
    this.save();
    return this.state.rooms.length < before;
  }

  // --- INQUIRIES ---
  getInquiries({ status, search, limit = 50, page = 1 } = {}) {
    let list = [...(this.state.inquiries || [])];
    if (status && status !== 'All') {
      list = list.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i => 
        (i.guestName && i.guestName.toLowerCase().includes(q)) ||
        (i.email && i.email.toLowerCase().includes(q)) ||
        (i.inquiryReference && i.inquiryReference.toLowerCase().includes(q)) ||
        (i.phone && i.phone.includes(q))
      );
    }
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);
    return { inquiries: paginated, total, page, totalPages: Math.ceil(total / limit) };
  }

  getInquiryById(id) {
    return (this.state.inquiries || []).find(i => i._id === id || i.inquiryReference === id) || null;
  }

  createInquiry(data) {
    const newInquiry = {
      _id: uuidv4(),
      status: 'New',
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    if (!this.state.inquiries) this.state.inquiries = [];
    this.state.inquiries.unshift(newInquiry);
    this.save();
    return newInquiry;
  }

  updateInquiry(id, updateData) {
    const index = (this.state.inquiries || []).findIndex(i => i._id === id || i.inquiryReference === id);
    if (index === -1) return null;
    this.state.inquiries[index] = {
      ...this.state.inquiries[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.state.inquiries[index];
  }

  addInquiryNote(id, { note, authorName, authorId }) {
    const item = this.getInquiryById(id);
    if (!item) return null;
    if (!item.internalNotes) item.internalNotes = [];
    const newNote = {
      _id: uuidv4(),
      note,
      authorName: authorName || 'Staff',
      authorId,
      createdAt: new Date().toISOString()
    };
    item.internalNotes.push(newNote);
    item.updatedAt = new Date().toISOString();
    this.save();
    return item;
  }

  // --- USERS / ADMIN ---
  getUsers() {
    return (this.state.users || []).map(u => {
      const { passwordHash, ...safe } = u;
      return safe;
    });
  }

  getUserByEmail(email) {
    return (this.state.users || []).find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  getUserById(id) {
    return (this.state.users || []).find(u => u._id === id) || null;
  }

  createUser(data) {
    const newUser = {
      _id: uuidv4(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    if (!this.state.users) this.state.users = [];
    this.state.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(id, updateData) {
    const index = (this.state.users || []).findIndex(u => u._id === id);
    if (index === -1) return null;
    this.state.users[index] = {
      ...this.state.users[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.state.users[index];
  }

  deleteUser(id) {
    const before = (this.state.users || []).length;
    this.state.users = (this.state.users || []).filter(u => u._id !== id);
    this.save();
    return this.state.users.length < before;
  }

  // --- OFFERS ---
  getOffers(onlyActive = true) {
    let list = [...(this.state.offers || [])];
    if (onlyActive) {
      list = list.filter(o => o.isActive !== false);
    }
    list.sort((a, b) => (a.order || 0) - (b.order || 0));
    return list;
  }

  createOffer(data) {
    const newOffer = {
      _id: uuidv4(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    if (!this.state.offers) this.state.offers = [];
    this.state.offers.push(newOffer);
    this.save();
    return newOffer;
  }

  updateOffer(id, updateData) {
    const index = (this.state.offers || []).findIndex(o => o._id === id);
    if (index === -1) return null;
    this.state.offers[index] = {
      ...this.state.offers[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.state.offers[index];
  }

  deleteOffer(id) {
    this.state.offers = (this.state.offers || []).filter(o => o._id !== id);
    this.save();
    return true;
  }

  // --- WEBSITE CONTENT ---
  getContent(key) {
    if (key) return this.state.content?.[key] || null;
    return this.state.content || {};
  }

  setContent(key, data, updatedBy = 'Staff') {
    if (!this.state.content) this.state.content = {};
    if (Array.isArray(data)) {
      this.state.content[key] = data;
    } else {
      this.state.content[key] = {
        ...data,
        lastUpdatedAt: new Date().toISOString(),
        lastUpdatedBy: updatedBy
      };
    }
    this.save();
    return this.state.content[key];
  }

  // --- ACTIVITY LOGS ---
  logActivity({ action, category, details, performedBy, ipAddress }) {
    const entry = {
      _id: uuidv4(),
      action,
      category: category || 'SYSTEM',
      details,
      performedBy: performedBy || { name: 'System' },
      ipAddress: ipAddress || '127.0.0.1',
      createdAt: new Date().toISOString()
    };
    if (!this.state.activityLogs) this.state.activityLogs = [];
    this.state.activityLogs.unshift(entry);
    // keep latest 200 logs
    if (this.state.activityLogs.length > 200) {
      this.state.activityLogs = this.state.activityLogs.slice(0, 200);
    }
    this.save();
    return entry;
  }

  getActivityLogs(limit = 50) {
    return (this.state.activityLogs || []).slice(0, limit);
  }

  // --- STATS ---
  getStats() {
    const inq = this.state.inquiries || [];
    const rooms = this.state.rooms || [];
    const statusCounts = {
      total: inq.length,
      new: inq.filter(i => i.status === 'New').length,
      contacted: inq.filter(i => i.status === 'Contacted').length,
      pending: inq.filter(i => i.status === 'Pending').length,
      confirmed: inq.filter(i => i.status === 'Confirmed').length,
      cancelled: inq.filter(i => i.status === 'Cancelled').length,
    };
    const conversionRate = inq.length > 0 
      ? Math.round((statusCounts.confirmed / inq.length) * 100) 
      : 0;

    return {
      statusCounts,
      conversionRate,
      totalRooms: rooms.length,
      publishedRooms: rooms.filter(r => r.isPublished !== false).length,
      recentInquiries: inq.slice(0, 5)
    };
  }
}

export const dataStore = new DataStore();
dataStore.init();
