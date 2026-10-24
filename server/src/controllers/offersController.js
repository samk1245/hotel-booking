import { dataStore } from '../models/dataStore.js';

export const getPublicOffers = (req, res) => {
  try {
    const offers = dataStore.getOffers(true);
    return res.status(200).json({ success: true, count: offers.length, offers });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not fetch offers.' });
  }
};

export const adminGetOffers = (req, res) => {
  try {
    const offers = dataStore.getOffers(false);
    return res.status(200).json({ success: true, count: offers.length, offers });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not fetch offers.' });
  }
};

export const adminCreateOffer = (req, res) => {
  try {
    const { title, subtitle, description, tag, discountText, validFrom, validTo, promoCode, image, perks } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const offer = dataStore.createOffer({
      title,
      subtitle: subtitle || '',
      description,
      tag: tag || 'Seasonal Package',
      discountText: discountText || '',
      validFrom: validFrom || '',
      validTo: validTo || '',
      promoCode: promoCode || '',
      image: image || 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      perks: Array.isArray(perks) ? perks : (perks ? perks.split('\n').filter(Boolean) : []),
      isActive: true,
      order: dataStore.getOffers(false).length + 1
    });

    dataStore.logActivity({
      action: 'OFFER_CREATED',
      category: 'OFFER',
      details: `Created promotional package: ${offer.title}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(201).json({ success: true, message: 'Offer created.', offer });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error creating offer.' });
  }
};

export const adminUpdateOffer = (req, res) => {
  try {
    const { id } = req.params;
    const updated = dataStore.updateOffer(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Offer not found.' });
    }

    dataStore.logActivity({
      action: 'OFFER_UPDATED',
      category: 'OFFER',
      details: `Updated offer: ${updated.title}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({ success: true, message: 'Offer updated.', offer: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error updating offer.' });
  }
};

export const adminDeleteOffer = (req, res) => {
  try {
    const { id } = req.params;
    dataStore.deleteOffer(id);

    dataStore.logActivity({
      action: 'OFFER_DELETED',
      category: 'OFFER',
      details: `Deleted offer ID: ${id}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({ success: true, message: 'Offer deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error deleting offer.' });
  }
};
