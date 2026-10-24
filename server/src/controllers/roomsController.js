import { dataStore } from '../models/dataStore.js';

// Slugify helper
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const getPublicRooms = (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = { isPublished: true };
    if (featured === 'true') filter.isFeatured = true;
    if (category) filter.category = category;

    const rooms = dataStore.getRooms(filter);
    return res.status(200).json({
      success: true,
      count: rooms.length,
      rooms
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not retrieve rooms.' });
  }
};

export const getRoomBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const room = dataStore.getRoomById(slug);

    if (!room || room.isPublished === false) {
      return res.status(404).json({
        success: false,
        message: 'Room not found or currently unavailable for booking inquiry.'
      });
    }

    return res.status(200).json({
      success: true,
      room
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving room.' });
  }
};

// --- Admin Endpoints ---
export const adminGetRooms = (req, res) => {
  try {
    const rooms = dataStore.getRooms(); // Returns all rooms, including unpublished
    return res.status(200).json({
      success: true,
      count: rooms.length,
      rooms
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to load rooms.' });
  }
};

export const adminCreateRoom = (req, res) => {
  try {
    const {
      name,
      category,
      headline,
      description,
      basePrice,
      priceDisplayNote,
      capacity,
      bedType,
      roomSize,
      view,
      floor,
      amenities,
      images,
      policies,
      isFeatured,
      isPublished
    } = req.body;

    if (!name || !headline || !description || !basePrice) {
      return res.status(400).json({
        success: false,
        message: 'Room name, headline, description, and base price are required.'
      });
    }

    let slug = slugify(name);
    // Check if slug collision
    let counter = 1;
    while (dataStore.getRoomById(slug)) {
      slug = `${slugify(name)}-${counter++}`;
    }

    const newRoom = dataStore.createRoom({
      name,
      slug,
      category: category || 'Deluxe Ocean Suite',
      headline,
      description,
      basePrice: Number(basePrice),
      priceDisplayNote: priceDisplayNote || 'Rates subject to seasonal confirmation',
      capacity: capacity || { adults: 2, children: 1, totalMax: 3 },
      bedType: bedType || '1 King Bed',
      roomSize: roomSize || '75 sq m',
      view: view || 'Ocean View',
      floor: floor || 'Upper Level',
      amenities: Array.isArray(amenities) ? amenities : (amenities ? amenities.split(',').map(s => s.trim()) : []),
      images: Array.isArray(images) && images.length > 0 ? images : [
        {
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
          caption: name,
          isPrimary: true,
          order: 1
        }
      ],
      policies: policies || {
        checkIn: '15:00',
        checkOut: '11:00',
        cancellation: 'Complimentary cancellation up to 48 hours prior to arrival.'
      },
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      displayOrder: dataStore.getRooms().length + 1
    });

    dataStore.logActivity({
      action: 'ROOM_CREATED',
      category: 'ROOM',
      details: `Created new room: ${newRoom.name} (${newRoom.category})`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Room suite created successfully.',
      room: newRoom
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create room.' });
  }
};

export const adminUpdateRoom = (req, res) => {
  try {
    const { id } = req.params;
    const existing = dataStore.getRoomById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Room not found.' });
    }

    const updated = dataStore.updateRoom(id, req.body);

    dataStore.logActivity({
      action: 'ROOM_UPDATED',
      category: 'ROOM',
      details: `Updated room suite: ${updated.name}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({
      success: true,
      message: 'Room updated successfully.',
      room: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update room.' });
  }
};

export const adminDeleteRoom = (req, res) => {
  try {
    const { id } = req.params;
    const existing = dataStore.getRoomById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Room not found.' });
    }

    dataStore.deleteRoom(id);

    dataStore.logActivity({
      action: 'ROOM_DELETED',
      category: 'ROOM',
      details: `Deleted room suite: ${existing.name}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({
      success: true,
      message: 'Room removed successfully.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete room.' });
  }
};
