"use client";
export const dynamic = "force-dynamic"; // prevents prerendering

import { useState } from "react";
import loadable from "next/dynamic"; // 👈 renamed to loadable
import ReportCard from "../components/ReportCard";

// Dynamically load MapView (client-side only)
const MapView = loadable(() => import("../components/MapView"), { ssr: false });

export default function HomePage() {
  const [image, setImage] = useState(null);
  const [reports, setReports] = useState([]); // ✅ always an array

  const handleUpload = (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setImage(URL.createObjectURL(file));

      // Dummy anomaly reports
      setReports([
        {
          id: 1,
          title: "Possible Ruins",
          description: "Detected unusual rectangular patterns.",
          coordinates: [20.2961, 85.8245],
        },
        {
          id: 2,
          title: "Soil Disturbance",
          description: "Detected vegetation density change.",
          coordinates: [19.076, 72.8777],
        },
      ]);
    } catch (err) {
      console.error("Error during upload:", err);
      setReports([]); // fallback so .map() never breaks
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">AI Archaeology Agent</h1>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {/* Show uploaded image */}
      {image && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Uploaded Image:</h2>
          <img
            src={image}
            alt="Uploaded"
            className="mt-2 max-w-md rounded shadow"
          />
        </div>
      )}

      {/* Map */}
      <h2 className="text-lg font-semibold mb-2">Anomaly Map:</h2>
      <MapView
        markers={(reports || []).map((r) => ({
          id: r.id,
          position: r.coordinates || [0, 0], // ✅ safe fallback
          text: r.title || "Unknown",
        }))}
      />

      {/* Reports */}
      <div className="mt-6 space-y-4">
        {(reports || []).map((r) => (
          <ReportCard
            key={r.id}
            title={r.title || "Untitled"}
            description={r.description || "No description available"}
          />
        ))}
      </div>
    </main>
  );
}
