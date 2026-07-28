"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import type { Venue } from "@/types/venue";
import { MapPopupCard } from "./map-popup-card";

type VenueMapProps = {
  venues: Venue[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

const PIN_WIDTH = 41;
const PIN_HEIGHT = 48;
const PIN_PATH =
  "M20.5 1.5C11.11 1.5 3.5 9.11 3.5 18.5c0 4.62 2.53 9.9 6.06 15.1 3.53 5.2 7.6 9.8 9.35 11.72a1.5 1.5 0 0 0 2.18 0c1.75-1.92 5.82-6.52 9.35-11.72 3.53-5.2 6.06-10.48 6.06-15.1 0-9.39-7.61-17-17-17Z";

function createPinIcon(selected: boolean): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:${PIN_WIDTH}px;height:${PIN_HEIGHT}px;filter:drop-shadow(0 3px 6px rgba(0,0,0,.2));">
      <svg width="${PIN_WIDTH}" height="${PIN_HEIGHT}" viewBox="0 0 41 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="${PIN_PATH}" fill="${selected ? "var(--color-primary)" : "#ffffff"}" stroke="var(--color-primary)" stroke-width="3"/>
        <circle cx="20.5" cy="18.5" r="11.5" fill="#ffffff"/>
      </svg>
      <img src="/images/logo-mark.png" alt="" style="position:absolute;left:50%;top:18.5px;transform:translate(-50%,-50%);width:15px;height:auto;" />
    </div>`,
    iconSize: [PIN_WIDTH, PIN_HEIGHT],
    iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
    popupAnchor: [0, -PIN_HEIGHT + 4],
  });
}

function FitBounds({ venues }: { venues: Venue[] }) {
  const map = useMap();

  useEffect(() => {
    if (venues.length === 0) return;
    map.fitBounds(
      L.latLngBounds(venues.map((v): L.LatLngTuple => [v.lat, v.lng])),
      { padding: [40, 40], maxZoom: 13 }
    );
  }, [map, venues]);

  return null;
}

function FocusSelected({
  venues,
  selectedId,
  markers,
  selectedRef,
}: {
  venues: Venue[];
  selectedId: string | null;
  markers: React.RefObject<Record<string, L.Marker>>;
  selectedRef: React.RefObject<string | null>;
}) {
  const map = useMap();

  useEffect(() => {
    selectedRef.current = selectedId;

    if (!selectedId) {
      map.closePopup();
      return;
    }

    const frame = requestAnimationFrame(() => {
      const marker = markers.current[selectedId];
      const venue = venues.find((v) => v.id === selectedId);
      if (!marker || !venue) return;
      if (marker.isPopupOpen()) return;
      if (!Number.isFinite(venue.lat) || !Number.isFinite(venue.lng)) return;

      const size = map.getSize();
      if (size.x === 0 || size.y === 0) return;

      map.flyTo([venue.lat, venue.lng], Math.max(map.getZoom(), 12), {
        duration: 0.6,
      });
      marker.openPopup();
    });

    return () => cancelAnimationFrame(frame);
  }, [map, markers, selectedId, selectedRef, venues]);

  return null;
}

export default function VenueMap({ venues, selectedId, onSelect }: VenueMapProps) {
  const markers = useRef<Record<string, L.Marker>>({});
  const selectedRef = useRef<string | null>(selectedId);

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper{padding:0;border-radius:22px;background:#fff;box-shadow:0 12px 36px rgba(0,0,0,.18);}
        .leaflet-popup-content{margin:0;width:auto !important;}
        .leaflet-popup-close-button{display:none;}
        .leaflet-popup-tip-container{width:48px;height:20px;margin-left:-24px;overflow:visible;}
        .leaflet-popup-tip{width:0;height:0;padding:0;margin:0;background:transparent;box-shadow:none;transform:none !important;border-left:24px solid transparent;border-right:24px solid transparent;border-top:20px solid #fff;}
      `}</style>
      <MapContainer
        className="h-full w-full"
        center={[51.505, -0.09]}
        zoom={12}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <ZoomControl position="topright" />
        <FitBounds venues={venues} />
        <FocusSelected
          venues={venues}
          selectedId={selectedId}
          markers={markers}
          selectedRef={selectedRef}
        />
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.lat, venue.lng]}
            icon={createPinIcon(venue.id === selectedId)}
            ref={(instance) => {
              if (instance) markers.current[venue.id] = instance;
              else delete markers.current[venue.id];
            }}
            eventHandlers={{
              popupopen: () => onSelect(venue.id),
              popupclose: () => {
                if (selectedRef.current === venue.id) onSelect(null);
              },
            }}
          >
            <Popup autoPan>
              <MapPopupCard venue={venue} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
