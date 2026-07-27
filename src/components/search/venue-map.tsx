"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
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

function createPinIcon(selected: boolean): L.DivIcon {
  const size = selected ? 40 : 34;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;background:var(--color-primary);border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:${selected ? 16 : 14}px;box-shadow:0 2px 8px rgba(0,0,0,.25);${selected ? "outline:3px solid var(--color-primary-hover);outline-offset:2px;" : ""}">V</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)],
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

export default function VenueMap({ venues, selectedId, onSelect }: VenueMapProps) {
  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper{padding:0;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.18);}
        .leaflet-popup-content{margin:0;}
        .leaflet-popup-close-button{display:none;}
        .leaflet-popup-tip-container{display:none;}
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
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.lat, venue.lng]}
            icon={createPinIcon(venue.id === selectedId)}
            eventHandlers={{
              popupopen: () => onSelect(venue.id),
              popupclose: () => onSelect(null),
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
