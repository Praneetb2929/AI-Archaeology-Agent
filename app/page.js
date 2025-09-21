"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet map (to avoid SSR issues)
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function HomePage() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">AI Archaeology Agent</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

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

      <h2 className="text-lg font-semibold mb-2">Anomaly Map:</h2>
      <Map />
    </main>
  );
}
