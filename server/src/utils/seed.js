import bcrypt from 'bcryptjs';
import { dataStore } from '../models/dataStore.js';

export const seedData = async () => {
  dataStore.init();

  // 1. Seed Admin Accounts
  const existingUsers = dataStore.getUsers();
  if (existingUsers.length === 0) {
    console.log('[Seed] Seeding authorized administrative accounts...');
    const superAdminPasswordHash = await bcrypt.hash('AzureAdmin2026!', 10);
    const managerPasswordHash = await bcrypt.hash('AzureManager2026!', 10);

    dataStore.createUser({
      name: 'Elena Rostova',
      email: 'admin@grandazure.com',
      passwordHash: superAdminPasswordHash,
      role: 'superadmin',
      isActive: true
    });

    dataStore.createUser({
      name: 'Marcus Vance',
      email: 'manager@grandazure.com',
      passwordHash: managerPasswordHash,
      role: 'manager',
      isActive: true
    });
  }

  // 2. Seed Luxury Rooms
  const existingRooms = dataStore.getRooms();
  if (existingRooms.length === 0) {
    console.log('[Seed] Seeding verified room suites & villas...');
    const luxuryRooms = [
      {
        name: 'The Azure Ocean Suite',
        slug: 'azure-ocean-suite',
        category: 'Deluxe Ocean Suite',
        headline: 'Sweeping Pacific Horizons & Private Sunset Terrace',
        description: 'Perched along the azure coastline, this sanctuary features expansive floor-to-ceiling glass windows framing endless ocean vistas. Decorated in soothing tones of ivory, brushed brass, and teak wood, the suite provides a hand-carved king bed, a freestanding deep soaking tub overlooking the sea, and an expansive private terrace with sun loungers.',
        basePrice: 720,
        priceDisplayNote: 'Rates subject to seasonal confirmation by our reservations team',
        capacity: { adults: 2, children: 1, totalMax: 3 },
        bedType: '1 Custom King Bed with Organic Linen',
        roomSize: '85 sq m / 915 sq ft',
        view: 'Panoramic Pacific Ocean & Sunset View',
        floor: 'Upper Levels (Floors 5 – 7)',
        amenities: [
          'Oceanfront Private Terrace',
          'Freestanding Marble Soaking Tub',
          'Aromatherapy Rainfall Shower',
          'Bespoke Bang & Olufsen Sound System',
          'Complimentary High-Speed Wi-Fi 6',
          'Sommelier Curated Wine & Mini-Bar',
          '24-Hour In-Suite Dining & Butler Call',
          'Nespresso Artisan Coffee Machine',
          'Diptyque Paris Luxury Bath Amenities',
          'Plush Egyptian Cotton Robes & Slippers'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
            caption: 'Master bedroom with panoramic Pacific ocean vista',
            isPrimary: true,
            order: 1
          },
          {
            url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            caption: 'Private sunset terrace with teak loungers',
            isPrimary: false,
            order: 2
          },
          {
            url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            caption: 'Italian marble bathroom with ocean-view soaking tub',
            isPrimary: false,
            order: 3
          }
        ],
        policies: {
          checkIn: '15:00',
          checkOut: '11:00',
          cancellation: 'Complimentary cancellation up to 48 hours prior to arrival date.'
        },
        isFeatured: true,
        isPublished: true,
        displayOrder: 1
      },
      {
        name: 'Royal Horizon Penthouse',
        slug: 'royal-horizon-penthouse',
        category: 'Royal Penthouse',
        headline: 'Crown Jewel of The Grand Azure with 360° Coastline Views',
        description: 'An architectural tour de force occupying the top level of the resort. Features two expansive master suites, a formal dining salon, a private infinity edge plunge pool on the wraparound veranda, and dedicated around-the-clock butler service. Designed for discerning travelers seeking peerless privacy and grandeur.',
        basePrice: 1450,
        priceDisplayNote: 'Exclusive suite rate; subject to private reservation consultation',
        capacity: { adults: 4, children: 2, totalMax: 6 },
        bedType: '2 California King Beds in Separate Wings',
        roomSize: '160 sq m / 1,720 sq ft',
        view: '360° Ocean, Coastal Cliffs & Twilight Skyline',
        floor: 'Private Penthouse Level (8th Floor, Direct Elevator)',
        amenities: [
          'Private Heated Veranda Plunge Pool',
          'Dedicated 24/7 Private Butler',
          'Private Direct Keycard Elevator Access',
          'Two Master Bathrooms with Calacatta Marble',
          'Fireplace in Primary Salon',
          'Chef Prep Pantry & Wine Cellar Refrigerator',
          'Complimentary Daily Chauffeur Transfer',
          'Welcome Vintage Dom Pérignon & Caviar Service',
          'Molton Brown Royal Edition Toiletries',
          'Biometric In-Room Safe'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80',
            caption: 'Penthouse master suite with floor-to-ceiling glass walls',
            isPrimary: true,
            order: 1
          },
          {
            url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
            caption: 'Salon and private plunge pool terrace',
            isPrimary: false,
            order: 2
          },
          {
            url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            caption: 'Formal dining salon and reception lounge',
            isPrimary: false,
            order: 3
          }
        ],
        policies: {
          checkIn: '15:00',
          checkOut: '12:00 (Guaranteed Late Check-out)',
          cancellation: 'Complimentary cancellation up to 7 days prior to arrival.'
        },
        isFeatured: true,
        isPublished: true,
        displayOrder: 2
      },
      {
        name: 'Azure Garden Sanctuary Villa',
        slug: 'garden-sanctuary-villa',
        category: 'Azure Garden Villa',
        headline: 'Botanical Seclusion with Private Zen Courtyard',
        description: 'Tucked within the resort’s lush coastal botanical gardens, our Sanctuary Villa offers absolute tranquility. Enjoy a secluded sun-dappled courtyard, an outdoor stone rain shower beneath tropical frangipani trees, and serene Japanese-inspired architecture crafted from warm cedar and stone.',
        basePrice: 890,
        priceDisplayNote: 'Rates subject to seasonal availability confirmation',
        capacity: { adults: 2, children: 1, totalMax: 3 },
        bedType: '1 Handcrafted Teak King Bed',
        roomSize: '120 sq m / 1,290 sq ft',
        view: 'Private Zen Garden & Fountain',
        floor: 'Ground Level Detached Villa with Private Gates',
        amenities: [
          'Enclosed Private Garden Courtyard',
          'Outdoor Lava Stone Rain Shower',
          'Deep Copper Japanese Soaking Tub',
          'Custom Yoga & Meditation Deck',
          'In-Villa Ayurvedic Tea Ceremony Set',
          'Complimentary Daily Spa Hydrotherapy Access',
          'Bicycle Fleet for Coastal Exploring',
          'Aveda Botanical Herbal Toiletries',
          'Individual Climate Zones & Fresh Ocean Air Doors',
          'Soundproof Solid Wood Construction'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80',
            caption: 'Serene garden villa interior leading out to private courtyard',
            isPrimary: true,
            order: 1
          },
          {
            url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
            caption: 'Private tropical courtyard and open-air rain shower',
            isPrimary: false,
            order: 2
          }
        ],
        policies: {
          checkIn: '15:00',
          checkOut: '11:00',
          cancellation: 'Complimentary cancellation up to 48 hours prior to arrival.'
        },
        isFeatured: true,
        isPublished: true,
        displayOrder: 3
      },
      {
        name: 'Executive Coastal Suite',
        slug: 'executive-coastal-suite',
        category: 'Executive Suite',
        headline: 'Refined Contemporary Comfort with Marina & Cove Views',
        description: 'A sophisticated sanctuary balancing work and restorative leisure. Features an ergonomic solid walnut work desk, high-speed encrypted Wi-Fi, an inviting living room, and a generous bedroom overlooking the yacht marina and rugged cliffs.',
        basePrice: 540,
        priceDisplayNote: 'Rates subject to reservation team verification',
        capacity: { adults: 2, children: 0, totalMax: 2 },
        bedType: '1 Luxury King Bed with Hypoallergenic Down Pillows',
        roomSize: '65 sq m / 700 sq ft',
        view: 'Marina & Coastal Cliff Views',
        floor: 'Levels 2 – 4',
        amenities: [
          'Separate Living Salon & Bedroom',
          'Ergonomic Executive Workspace',
          'Dual Vanity Marble Bathroom',
          'Walk-in Dressing Wardrobe',
          'Smart Environmental Controls & Blackout Curtains',
          'Complimentary Dry Cleaning (2 items/day)',
          'Espresso Machine & Premium Loose Leaf Teas',
          'Acqua di Parma Toiletries'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
            caption: 'Executive suite living quarters and private balcony',
            isPrimary: true,
            order: 1
          },
          {
            url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
            caption: 'Contemporary bedroom with marina vistas',
            isPrimary: false,
            order: 2
          }
        ],
        policies: {
          checkIn: '15:00',
          checkOut: '11:00',
          cancellation: 'Complimentary cancellation up to 48 hours prior to arrival.'
        },
        isFeatured: false,
        isPublished: true,
        displayOrder: 4
      },
      {
        name: 'Pacific Sunrise Villa',
        slug: 'pacific-sunrise-villa',
        category: 'Presidential Villa',
        headline: 'Oceanfront Estate with Private Plunge Pool & Sun Deck',
        description: 'Wake up to golden California dawns. This standalone villa provides unprecedented closeness to the surf, featuring dual master suites, private heated plunge pool, dedicated outdoor kitchen, and an expansive lawn kissing the coastline path.',
        basePrice: 1200,
        priceDisplayNote: 'Rates subject to seasonal confirmation',
        capacity: { adults: 4, children: 2, totalMax: 6 },
        bedType: '2 King Beds with Cloud Mattresses',
        roomSize: '140 sq m / 1,500 sq ft',
        view: 'Unobstructed Sunrise Oceanfront',
        floor: 'Cliffside Ground Estate with Private Gated Access',
        amenities: [
          'Private Heated Plunge Pool & Sun Terrace',
          'Outdoor Kitchen & Alfresco Dining Cabana',
          'Direct Access to Coastal Pathway',
          'Dual En-Suite Bathrooms with Rain Showers',
          'Sub-Zero Wine Storage & Bar Cart',
          'Nightly Fire Pit Turndown Service',
          'Full Concierge Pre-Stocking Service'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
            caption: 'Villa pool terrace facing the open ocean',
            isPrimary: true,
            order: 1
          },
          {
            url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
            caption: 'Spacious coastal living quarters',
            isPrimary: false,
            order: 2
          }
        ],
        policies: {
          checkIn: '15:00',
          checkOut: '12:00',
          cancellation: 'Complimentary cancellation up to 5 days prior to arrival.'
        },
        isFeatured: true,
        isPublished: true,
        displayOrder: 5
      },
      {
        name: 'The Azure Deluxe Sanctuary',
        slug: 'azure-deluxe-sanctuary',
        category: 'Superior Room',
        headline: 'Classic Elegance & Warm Hospitality',
        description: 'An intimate retreat providing unmatched comfort. Thoughtfully appointed with natural hardwood floors, custom woven textiles, a spa-inspired rain shower, and a private Juliet balcony overlooking our fragrant herb and rose gardens.',
        basePrice: 420,
        priceDisplayNote: 'Rates subject to seasonal confirmation',
        capacity: { adults: 2, children: 0, totalMax: 2 },
        bedType: '1 Plush King or 2 Queen Beds',
        roomSize: '50 sq m / 540 sq ft',
        view: 'Courtyard & Fragrant Rose Gardens',
        floor: 'Levels 1 – 3',
        amenities: [
          'Juliet Balcony overlooking Gardens',
          'Spa Rain Shower & Italian Stone Finishes',
          'Smart HDTV with Streaming Support',
          'Fine Linen and Feather Duvet',
          'In-Room Safe & Refreshment Center',
          'Complimentary High-Speed Wi-Fi'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80',
            caption: 'Warm ambient lighting and tailored upholstery',
            isPrimary: true,
            order: 1
          }
        ],
        policies: {
          checkIn: '15:00',
          checkOut: '11:00',
          cancellation: 'Complimentary cancellation up to 48 hours prior to arrival.'
        },
        isFeatured: false,
        isPublished: true,
        displayOrder: 6
      }
    ];

    luxuryRooms.forEach(room => dataStore.createRoom(room));
  }

  // 3. Seed Promotional Offers
  const existingOffers = dataStore.getOffers(false);
  if (existingOffers.length === 0) {
    console.log('[Seed] Seeding promotional packages...');
    const initialOffers = [
      {
        title: 'Timeless Escape: 4th Night Complimentary',
        subtitle: 'Extend your sanctuary by the Pacific',
        description: 'Immerse yourself in coastal tranquility. Book a consecutive three-night stay in any of our Ocean Suites or Private Villas, and receive the fourth night with our compliments, including daily gourmet champagne breakfast for two.',
        tag: 'Extended Stay Privilege',
        discountText: 'Stay 4, Pay 3',
        validFrom: '2026-10-01',
        validTo: '2026-12-20',
        promoCode: 'AZURE4TH',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
        perks: [
          'Fourth night complimentary on eligible suites',
          'Daily champagne breakfast for two at The Azure Terrace',
          'Welcome sommelier reserve bottle in suite',
          'Guaranteed 14:00 late check-out'
        ],
        isActive: true,
        order: 1
      },
      {
        title: 'Couples Sanctuary & Spa Ritual',
        subtitle: 'Rejuvenate together in holistic serenity',
        description: 'An idyllic romantic retreat featuring a 90-minute bespoke Thalassotherapy couples massage, followed by a private sunset cabana dinner paired with biodynamic coastal wines curated by Chef Laurent.',
        tag: 'Romance & Wellness',
        discountText: '$250 Spa Credit Included',
        validFrom: '2026-10-15',
        validTo: '2027-04-30',
        promoCode: 'ROMANCE26',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
        perks: [
          '90-Minute Signature Couples Massage Ritual',
          'Three-course candlelit dinner in private ocean cabana',
          'Chilled vintage champagne & chocolate truffles upon arrival',
          'Daily access to mineral thermal pools'
        ],
        isActive: true,
        order: 2
      },
      {
        title: 'Advance Sanctuary Privilege',
        subtitle: 'Plan ahead for preferred seasonal rates',
        description: 'Reserve your stay at least 30 days prior to arrival to enjoy preferred rates across all suites, along with complimentary priority suite upgrade upon check-in, subject to availability.',
        tag: 'Early Booking',
        discountText: 'Up to 20% Privilege Rate',
        validFrom: '2026-11-01',
        validTo: '2027-08-31',
        promoCode: 'ADVANCE26',
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
        perks: [
          'Privileged base rate deduction',
          'Priority suite tier upgrade upon check-in',
          'Valet parking complimentary throughout your stay',
          'Flexible single-date rescheduling window'
        ],
        isActive: true,
        order: 3
      }
    ];

    initialOffers.forEach(o => dataStore.createOffer(o));
  }

  // 4. Seed Hotel Website Content (Editable via Admin Dashboard)
  const existingContent = dataStore.getContent();
  if (!existingContent.hotel_info) {
    console.log('[Seed] Seeding verified hotel content & copy...');
    dataStore.setContent('hotel_info', {
      name: 'The Grand Azure Resort & Spa',
      tagline: 'A Coastal Sanctuary of Timeless Elegance',
      shortDescription: 'Nestled between dramatic ocean cliffs and sun-drenched Pacific waters, The Grand Azure offers an exquisite blend of refined architecture, Michelin-caliber gastronomy, and deeply restorative wellness retreats.',
      address: {
        street: '420 Ocean Promenade',
        city: 'Azure Cove, La Jolla',
        state: 'California',
        postalCode: '92037',
        country: 'United States of America',
        full: '420 Ocean Promenade, Azure Cove, CA 92037, USA'
      },
      coordinates: {
        lat: 32.8427,
        lng: -117.2734
      },
      contact: {
        phone: '+1 (858) 555-0199',
        phoneRaw: '+18585550199',
        email: 'concierge@grandazureresort.com',
        reservationsEmail: 'reservations@grandazureresort.com',
        whatsapp: '+18585550199',
        whatsappFormatted: '+1 (858) 555-0199',
        receptionHours: '24 Hours Daily',
        conciergeHours: '06:00 – 23:00 Daily'
      },
      policies: {
        checkInTime: '15:00',
        checkOutTime: '11:00',
        earlyCheckInNote: 'Early check-in subject to availability upon arrival; please notify the concierge.',
        cancellationPolicy: 'Inquiries do not incur charges. Confirmed reservations offer complimentary cancellation up to 48 hours prior to arrival date unless specified otherwise in promotional terms.',
        petPolicy: 'Well-mannered dogs up to 35 lbs welcomed in designated Garden Villas with dedicated pet concierge kit (fee applies).',
        smokingPolicy: 'The Grand Azure is a 100% smoke-free and vape-free sanctuary across all guest rooms, suites, and public indoor spaces.'
      }
    });

    dataStore.setContent('dining', [
      {
        name: 'The Azure Terrace',
        cuisine: 'Coastal Mediterranean & Pacific Seafood',
        chef: 'Executive Chef Laurent Fournier',
        description: 'An open-air dining spectacle suspended above the Pacific waves. Indulge in line-caught sea bass, hand-rolled saffron pasta, and an extensive cellar of biodynamic vintages.',
        hours: 'Breakfast 07:00 – 11:00 | Dinner 18:00 – 22:30',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        dressCode: 'Resort Elegant (Collared shirts for gentlemen; no athletic attire)'
      },
      {
        name: 'Saltwater Grill & Tide Bar',
        cuisine: 'Artisan Wood-Fired Grilling & Raw Oyster Bar',
        chef: 'Chef de Cuisine Kenji Tanaka',
        description: 'Directly alongside the ocean tide pools. Savor freshly shucked Pacific oysters, charcoal-roasted king prawns, and A5 Wagyu striploin alongside chilled California crisp whites.',
        hours: 'Lunch 12:00 – 16:30 | Sunset Cocktails 16:30 – 21:00',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        dressCode: 'Smart Casual'
      },
      {
        name: 'L’Horizon Sunset Lounge',
        cuisine: 'Botanical Mixology & Caviar Tasting',
        chef: 'Master Mixologist Camille Dupuis',
        description: 'Gather at golden hour for rare single-barrel spirits, elderflower infusions, and light evening tapas accompanied by live acoustic cello and jazz.',
        hours: 'Daily 16:00 – 01:00',
        image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80',
        dressCode: 'Resort Evening'
      }
    ]);

    dataStore.setContent('wellness', {
      title: 'The Azure Ocean Spa & Wellness Sanctuary',
      tagline: 'Ancient Thalassotherapy Meets Modern Restorative Science',
      description: 'Draw upon the healing vitality of the Pacific. Spanning 15,000 square feet, our spa offers heated mineral pools, Himalayan salt saunas, open-air meditation decks, and custom restorative treatments curated by master practitioners.',
      features: [
        'Heated Ocean Mineral Thalassotherapy Pools',
        'Traditional Cedarwood & Herbal Steam Saunas',
        'Private Sunset Yoga & Sound Bath Pavilions',
        'Cold-Plunge Cryo-Therapy Suites',
        'Biologique Recherche & Organic Botanical Treatments',
        'Technogym Olympic-Grade Fitness Center with Coastal Views'
      ],
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80'
    });

    dataStore.setContent('faqs', [
      {
        question: 'What is the procedure for booking inquiries through this website?',
        answer: 'Submitting a booking inquiry sends your desired dates and room preferences directly to our private reservations concierge. Our team personally reviews real-time suite inventory and contacts you via phone or email within 2 to 4 hours with guaranteed availability and a customized reservation confirmation.'
      },
      {
        question: 'Are published room rates all-inclusive or subject to confirmation?',
        answer: 'All published prices on this website represent authorized baseline rates. Final total pricing, including seasonal adjustments, occupancy taxes, and any requested bespoke additions, is formally provided and confirmed by our reservation team before any commitment is finalized.'
      },
      {
        question: 'What are the official check-in and check-out times?',
        answer: 'Check-in commences at 15:00 (3:00 PM), and check-out is at 11:00 AM (12:00 PM for Penthouse & Villa guests). Early check-in or late check-out may be arranged in advance with our concierge team based on availability.'
      },
      {
        question: 'Do you offer private airport transfers and chauffeur services?',
        answer: 'Yes. Our private fleet of electric luxury house cars provides complimentary transfers within a 5-mile local radius. Private airport transfers from San Diego International (SAN) and Los Angeles (LAX) can be scheduled with our concierge.'
      },
      {
        question: 'What is your cancellation and modification policy?',
        answer: 'Booking inquiries carry zero financial obligation. Once a reservation is confirmed with our front desk, complimentary cancellation is available up to 48 hours prior to arrival date (7 days for Penthouse bookings), after which the first night deposit applies.'
      },
      {
        question: 'Can dietary restrictions and bespoke dining requests be accommodated?',
        answer: 'Absolutely. Our culinary teams across The Azure Terrace and Saltwater Grill regularly prepare personalized gluten-free, vegan, halal, and allergen-safe tasting menus. Please note any dietary preferences in your booking inquiry.'
      }
    ]);

    dataStore.setContent('gallery', [
      {
        id: 'gal-1',
        title: 'Infinity Oceanfront Pool at Sunset',
        category: 'Resort',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
        caption: 'Heated cliffside infinity pool overlooking the Pacific sunset'
      },
      {
        id: 'gal-2',
        title: 'The Azure Ocean Suite Master Bedroom',
        category: 'Rooms',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
        caption: 'Panoramic ocean view bedroom with custom king bed'
      },
      {
        id: 'gal-3',
        title: 'The Azure Terrace Fine Dining',
        category: 'Dining',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
        caption: 'Candlelit dining overlooking the evening coastal surf'
      },
      {
        id: 'gal-4',
        title: 'Thalassotherapy & Mineral Spa',
        category: 'Wellness',
        url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80',
        caption: 'Calming hydrotherapy mineral pool and treatment suites'
      },
      {
        id: 'gal-5',
        title: 'Royal Penthouse Wraparound Veranda',
        category: 'Rooms',
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80',
        caption: 'Private open-air lounge and heated plunge pool'
      },
      {
        id: 'gal-6',
        title: 'Zen Botanical Courtyard Villa',
        category: 'Rooms',
        url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80',
        caption: 'Fragrant tropical greenery surrounding private villa retreat'
      },
      {
        id: 'gal-7',
        title: 'L’Horizon Sunset Cocktail Lounge',
        category: 'Dining',
        url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1600&q=80',
        caption: 'Artisan mixology and live jazz lounge'
      },
      {
        id: 'gal-8',
        title: 'Private Cliffside Ocean Walkway',
        category: 'Resort',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
        caption: 'Secluded seaside path directly accessible to hotel guests'
      }
    ]);

    dataStore.setContent('testimonials', [
      {
        id: 't-1',
        guestName: 'Sir Arthur & Lady Evelyn Montgomery',
        stayDate: 'September 2026',
        roomType: 'Royal Horizon Penthouse',
        comment: 'An extraordinary sanctuary. From our private arrival to the attentive discretion of our butler, every detail at The Grand Azure whispered understated refinement. The sunset views over the Pacific from the plunge pool are unforgettable.',
        rating: 5,
        verified: true
      },
      {
        id: 't-2',
        guestName: 'Dr. Vivienne Chen',
        stayDate: 'August 2026',
        roomType: 'Garden Sanctuary Villa',
        comment: 'The spa and Zen garden villa exceeded every expectation. True peace and privacy, with culinary creations that rival three-star Michelin establishments in Europe. We will certainly return every season.',
        rating: 5,
        verified: true
      },
      {
        id: 't-3',
        guestName: 'Julian & Claire Sterling',
        stayDate: 'July 2026',
        roomType: 'The Azure Ocean Suite',
        comment: 'Booking was remarkably smooth; the concierge phoned us within two hours of our online inquiry and tailored every reservation to our anniversary. The warmth of the hospitality is genuine and world-class.',
        rating: 5,
        verified: true
      }
    ]);
  }

  // 5. Seed Initial Activity Log
  dataStore.logActivity({
    action: 'SYSTEM_INITIALIZED',
    category: 'SYSTEM',
    details: 'The Grand Azure Resort database seeded with verified rooms, verified offers, authentic content, and administrative credentials.',
    performedBy: { name: 'System Installer' }
  });

  console.log('[Seed] Database initialization complete.');
};

// If run directly via node
if (process.argv[1]?.endsWith('seed.js')) {
  seedData().then(() => {
    console.log('[Seed] Standalone seed run finished.');
    process.exit(0);
  });
}
