import { dataStore } from '../models/dataStore.js';

export const getWebsiteContent = (req, res) => {
  try {
    const { key } = req.params;
    const content = dataStore.getContent(key);
    return res.status(200).json({ success: true, content });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not load content.' });
  }
};

export const adminUpdateContent = (req, res) => {
  try {
    const { key } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ success: false, message: 'Payload data is required.' });
    }

    const updated = dataStore.setContent(key, data, req.user?.name || 'Administrator');

    dataStore.logActivity({
      action: 'CONTENT_UPDATED',
      category: 'CONTENT',
      details: `Updated website content section: [${key}]`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({
      success: true,
      message: `Section [${key}] updated successfully.`,
      content: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error updating content.' });
  }
};

export const submitContactMessage = (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    dataStore.logActivity({
      action: 'CONTACT_FORM_SUBMISSION',
      category: 'SYSTEM',
      details: `Contact message received from ${name} (${email}): "${subject}"`,
      performedBy: { name, email },
      ipAddress: req.ip
    });

    console.log(`[ContactForm] Message from ${name} <${email}>: "${subject}" - "${message}"`);

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out. Our guest relations team will respond within 4 hours.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};
