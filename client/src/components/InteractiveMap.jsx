import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Car, Plane, Anchor } from 'lucide-react';
import L from 'leaflet';

export default function InteractiveMap({ address, coordinates }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [streetViewMode, setStreetViewMode] = useState(false);

  const lat = coordinates?.lat || 32.8427;
  const lng = coordinates?.lng || -117.2734;
  const fullAddress = address?.full || '420 Ocean Promenade, Azure Cove, CA 92037, USA';

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const googleMapsStreetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}&heading=-45&pitch=5&fov=80`;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Ensure container is clean and no duplicate instance exists
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (e) {}
      mapInstanceRef.current = null;
    }
    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    try {
      // Custom Luxury Gold Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-hotel-pin',
        html: `
          <div style="
            width: 38px;
            height: 38px;
            background: #0B192C;
            border: 2px solid #C5A880;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(11,25,44,0.4);
          ">
            <div style="
              width: 14px;
              height: 14px;
              background: #C5A880;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
      });

      // Initialize Map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 14,
        scrollWheelZoom: false
      });

      // High quality OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Marker
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="text-align: center; padding: 4px; font-family: sans-serif;">
          <strong style="color: #07111E; font-size: 13px; display: block; font-family: serif;">XYZ Hotel</strong>
          <span style="font-size: 11px; color: #64748B;">${fullAddress}</span>
        </div>
      `).openPopup();

      mapInstanceRef.current = map;
    } catch (err) {
      console.warn('Map initialization notice:', err.message);
    }

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      } catch (e) {}
    };
  }, [lat, lng, fullAddress]);

  return (
    <div className="bg-white rounded-xl border border-ivory-200 overflow-hidden shadow-luxury">
      
      {/* Map Header Toolbar */}
      <div className="p-4 sm:p-6 bg-navy-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-widest font-semibold">
            <MapPin className="w-4 h-4" />
            <span>Verified Coastal Sanctuary Location</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-white mt-1">
            420 Ocean Promenade, Azure Cove, CA 92037
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Coordinates: {lat}° N, {Math.abs(lng)}° W &bull; Pacific Bluff San Diego / La Jolla Enclave
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-navy-950 font-semibold rounded text-xs uppercase tracking-wider hover:from-gold-200 hover:to-gold-400 transition-all shadow"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>

          <a
            href={googleMapsStreetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-navy-800 text-ivory-200 border border-navy-700 hover:bg-navy-700 rounded text-xs uppercase tracking-wider transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>Street View 360°</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Map View Canvas */}
      <div className="relative">
        <div 
          ref={mapContainerRef} 
          className="w-full h-[400px] sm:h-[480px] z-10"
        />

        {/* Floating Proximity Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-20 bg-white/95 backdrop-blur-md border border-ivory-300 rounded-lg p-4 shadow-luxury text-navy-950 text-xs">
          <div className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mb-2">
            Arrival & Proximity Distances
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700">
            <div className="flex items-center space-x-2">
              <Plane className="w-4 h-4 text-navy-800 shrink-0" />
              <span><strong>SAN Airport:</strong> 22 mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-navy-800 shrink-0" />
              <span><strong>LAX Airport:</strong> 1h 45m</span>
            </div>
            <div className="flex items-center space-x-2">
              <Anchor className="w-4 h-4 text-navy-800 shrink-0" />
              <span><strong>Marina:</strong> 4 mins</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-ivory-200 text-[10px] text-slate-500">
            Complimentary chauffeured house car service available for guests within a 5-mile radius.
          </div>
        </div>
      </div>

    </div>
  );
}
