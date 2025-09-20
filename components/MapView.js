// components/MapView.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ anomalies }) {
  return (
    <MapContainer center={[20, 77]} zoom={5} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {anomalies.map((a, idx) => (
        <Marker key={idx} position={[a.latitude, a.longitude]}>
          <Popup>
            <strong>{a.anomaly_type}</strong>
            <p>{a.interpretation}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
