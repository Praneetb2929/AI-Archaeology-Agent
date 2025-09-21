"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ markers = [] }) {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-[400px] w-full rounded shadow">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {Array.isArray(markers) &&
        markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>{marker.text}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

