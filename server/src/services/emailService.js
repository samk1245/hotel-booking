import nodemailer from 'nodemailer';

let transporter = null;

// Initialize transporter if SMTP configuration is provided
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  console.log('[EmailService] SMTP transporter configured for', process.env.SMTP_HOST);
} else {
  console.log('[EmailService] SMTP credentials not set in .env. Using high-visibility console logger for inquiry email notifications.');
}

export const sendInquiryEmails = async ({ inquiry, hotelInfo }) => {
  const hotelName = hotelInfo?.name || 'XYZ Hotel';
  const staffRecipient = process.env.NOTIFICATION_EMAIL || hotelInfo?.contact?.reservationsEmail || 'reservations@xyzhotel.com';
  const adminUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}${process.env.ADMIN_PATH || '/private-management'}`;

  // 1. Guest Confirmation Email
  const guestHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 20px; color: #0B192C; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(11,25,44,0.08); border: 1px solid #EFEAE0; }
        .header { background-color: #07111E; padding: 36px 24px; text-align: center; border-bottom: 2px solid #C5A880; }
        .header h1 { color: #DFCCAA; font-size: 24px; letter-spacing: 2px; margin: 0; text-transform: uppercase; font-weight: 300; }
        .header p { color: #A0B2C6; font-size: 13px; margin: 6px 0 0 0; letter-spacing: 1px; }
        .content { padding: 32px 28px; line-height: 1.6; }
        .ref-box { background-color: #FAF8F5; border-left: 4px solid #C5A880; padding: 16px 20px; margin: 24px 0; border-radius: 4px; }
        .ref-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8E7145; font-weight: 600; }
        .ref-val { font-size: 22px; font-weight: 700; color: #07111E; margin-top: 4px; font-family: monospace; letter-spacing: 1px; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table td { padding: 10px 0; border-bottom: 1px solid #F2EEE5; font-size: 14px; }
        .table td.label { color: #64748B; width: 40%; }
        .table td.value { color: #07111E; font-weight: 600; text-align: right; }
        .disclaimer-box { background-color: #FFF9ED; border: 1px solid #F4E2BD; border-radius: 6px; padding: 16px; margin: 24px 0; font-size: 12px; color: #8A6D3B; line-height: 1.5; }
        .footer { background-color: #F7F4EE; padding: 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #EFEAE0; }
        .footer a { color: #C5A880; text-decoration: none; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${hotelName}</h1>
          <p>LUXURY SANCTUARY OF TIMELESS ELEGANCE</p>
        </div>
        <div class="content">
          <h2 style="font-size: 20px; color: #07111E; margin-top: 0;">Dear ${inquiry.guestName},</h2>
          <p>Thank you for your interest in experiencing ${hotelName}. We have received your booking inquiry and our reservations concierge is currently reviewing current suite inventory for your requested dates.</p>
          
          <div class="ref-box">
            <div class="ref-label">Your Booking Inquiry Reference</div>
            <div class="ref-val">${inquiry.inquiryReference}</div>
          </div>

          <table class="table">
            <tr>
              <td class="label">Preferred Accommodation</td>
              <td class="value">${inquiry.preferredRoomName || 'Any Available Suite'}</td>
            </tr>
            <tr>
              <td class="label">Check-in Date</td>
              <td class="value">${inquiry.checkInDate}</td>
            </tr>
            <tr>
              <td class="label">Check-out Date</td>
              <td class="value">${inquiry.checkOutDate}</td>
            </tr>
            <tr>
              <td class="label">Number of Guests</td>
              <td class="value">${inquiry.adults} Adults${inquiry.children > 0 ? `, ${inquiry.children} Children` : ''}</td>
            </tr>
            <tr>
              <td class="label">Number of Suites</td>
              <td class="value">${inquiry.roomCount || 1} Suite(s)</td>
            </tr>
            ${inquiry.specialRequests ? `
            <tr>
              <td class="label">Special Requests</td>
              <td class="value" style="font-weight: normal; font-style: italic;">"${inquiry.specialRequests}"</td>
            </tr>` : ''}
          </table>

          <div class="disclaimer-box">
            <strong>Important Hospitality Notice:</strong> This email confirms receipt of your booking inquiry. In accordance with luxury boutique standards, accommodations are guaranteed only upon formal reservation verification and confirmation by our front desk team. A dedicated concierge will contact you by phone or email within 2 to 4 hours.
          </div>

          <p>Should you require immediate assistance or wish to provide bespoke arrival requirements, please contact our concierge team at <a href="tel:${hotelInfo?.contact?.phoneRaw || '+919820123456'}" style="color: #C5A880; font-weight: 600;">${hotelInfo?.contact?.phone || '+91 98201 23456'}</a> or via WhatsApp.</p>
          
          <p style="margin-top: 24px; margin-bottom: 0;">Warmest regards,</p>
          <p style="font-weight: 600; color: #07111E; margin-top: 4px;">The Reservations Concierge<br><span style="font-size: 13px; color: #64748B; font-weight: normal;">${hotelName}</span></p>
        </div>
        <div class="footer">
          <p>${hotelInfo?.address?.full || '420 Marine Promenade, Coastal Bay, Goa 403001, India'}</p>
          <p>Phone: ${hotelInfo?.contact?.phone || '+91 98201 23456'} &bull; Email: ${hotelInfo?.contact?.email || 'concierge@xyzhotel.com'}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. Staff Notification Email
  const staffHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: sans-serif; background-color: #f3f4f6; padding: 20px; color: #111827; }
        .box { max-width: 600px; margin: auto; background: white; border-radius: 8px; border-top: 4px solid #175943; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .badge { background: #E6F4EA; color: #137333; font-weight: bold; padding: 4px 10px; border-radius: 12px; font-size: 12px; display: inline-block; }
        .btn { display: inline-block; background: #0B192C; color: #DFCCAA; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="margin: 0; color: #0B192C;">New Guest Booking Inquiry</h2>
          <span class="badge">ACTION REQUIRED</span>
        </div>
        <p><strong>Reference:</strong> ${inquiry.inquiryReference}</p>
        <p><strong>Guest Name:</strong> ${inquiry.guestName}</p>
        <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${inquiry.phone}">${inquiry.phone}</a></p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 16px 0;">
        <p><strong>Dates:</strong> ${inquiry.checkInDate} &rarr; ${inquiry.checkOutDate}</p>
        <p><strong>Suite:</strong> ${inquiry.preferredRoomName || 'Any Available'}</p>
        <p><strong>Guests:</strong> ${inquiry.adults} Adults, ${inquiry.children || 0} Children (${inquiry.roomCount || 1} room[s])</p>
        ${inquiry.specialRequests ? `<p><strong>Special Requests:</strong> ${inquiry.specialRequests}</p>` : ''}
        <a href="${adminUrl}" class="btn">Open Private Admin Dashboard &rarr;</a>
      </div>
    </body>
    </html>
  `;

  // Send via Nodemailer if configured
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${hotelName}" <${process.env.SMTP_FROM || 'concierge@xyzhotel.com'}>`,
        to: inquiry.email,
        subject: `Booking Inquiry Acknowledgment [${inquiry.inquiryReference}] - ${hotelName}`,
        html: guestHtml
      });

      await transporter.sendMail({
        from: `"${hotelName} Alerts" <${process.env.SMTP_FROM || 'alerts@xyzhotel.com'}>`,
        to: staffRecipient,
        subject: `[NEW INQUIRY] ${inquiry.inquiryReference} - ${inquiry.guestName} (${inquiry.checkInDate})`,
        html: staffHtml
      });

      console.log(`[EmailService] Inquiry notifications dispatched for ${inquiry.inquiryReference}`);
      return { success: true, method: 'smtp' };
    } catch (err) {
      console.error('[EmailService] SMTP send failure:', err.message);
    }
  }

  // Graceful development console fallback
  console.log('\n======================================================');
  console.log(`📨 [Email Service Mock Notification]`);
  console.log(`To Guest: ${inquiry.email}`);
  console.log(`To Staff: ${staffRecipient}`);
  console.log(`Reference: ${inquiry.inquiryReference}`);
  console.log(`Guest: ${inquiry.guestName} | Suite: ${inquiry.preferredRoomName}`);
  console.log(`Dates: ${inquiry.checkInDate} to ${inquiry.checkOutDate} | Guests: ${inquiry.adults}A, ${inquiry.children}C`);
  console.log(`Admin Portal: ${adminUrl}`);
  console.log('======================================================\n');

  return { success: true, method: 'mock-logged' };
};
