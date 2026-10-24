import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Deluxe Ocean Suite', 'Royal Penthouse', 'Azure Garden Villa', 'Executive Suite', 'Presidential Villa', 'Superior Room'] 
  },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true }, // Verified authorized base price or indicative starting rate
  priceDisplayNote: { type: String, default: 'Rates subject to seasonal confirmation' },
  capacity: {
    adults: { type: Number, required: true, default: 2 },
    children: { type: Number, required: true, default: 0 },
    totalMax: { type: Number, required: true, default: 3 }
  },
  bedType: { type: String, default: '1 King Bed' },
  roomSize: { type: String, default: '65 sq m / 700 sq ft' },
  view: { type: String, default: 'Panoramic Ocean View' },
  floor: { type: String, default: 'Levels 4 - 8' },
  amenities: [{ type: String }],
  images: [{
    url: { type: String, required: true },
    caption: { type: String, default: '' },
    isPrimary: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  }],
  policies: {
    checkIn: { type: String, default: '15:00' },
    checkOut: { type: String, default: '11:00' },
    cancellation: { type: String, default: 'Complimentary cancellation up to 48 hours prior to arrival.' }
  },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

const InquirySchema = new mongoose.Schema({
  inquiryReference: { type: String, required: true, unique: true },
  guestName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  adults: { type: Number, required: true, min: 1 },
  children: { type: Number, default: 0, min: 0 },
  preferredRoomId: { type: String, default: '' },
  preferredRoomName: { type: String, default: 'Any Available Category' },
  roomCount: { type: Number, default: 1, min: 1 },
  specialRequests: { type: String, default: '' },
  consentPrivacy: { type: Boolean, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['New', 'Contacted', 'Pending', 'Confirmed', 'Cancelled'],
    default: 'New' 
  },
  internalNotes: [{
    note: { type: String, required: true },
    authorName: { type: String, required: true },
    authorId: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  followUpDate: { type: String, default: '' },
  estimatedValue: { type: Number, default: 0 },
  ipAddress: { type: String },
  userAgent: { type: String }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['superadmin', 'manager', 'staff'],
    default: 'staff' 
  },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

const ContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  lastUpdatedBy: { type: String }
}, { timestamps: true });

const OfferSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, required: true },
  tag: { type: String, default: 'Seasonal Offer' },
  discountText: { type: String, default: '' },
  validFrom: { type: String },
  validTo: { type: String },
  promoCode: { type: String, default: '' },
  image: { type: String, default: '' },
  perks: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const ActivityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['AUTH', 'INQUIRY', 'ROOM', 'OFFER', 'CONTENT', 'STAFF', 'SYSTEM'],
    default: 'SYSTEM'
  },
  details: { type: mongoose.Schema.Types.Mixed },
  performedBy: {
    id: { type: String },
    name: { type: String, default: 'System' },
    email: { type: String }
  },
  ipAddress: { type: String }
}, { timestamps: true });

export {
  RoomSchema,
  InquirySchema,
  UserSchema,
  ContentSchema,
  OfferSchema,
  ActivityLogSchema
};
