// components/ImageUploader.js
import { useState } from "react";
import axios from "axios";

export default function ImageUploader({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select an image first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Normalize response so UI never breaks
      const result = res.data || {};
      const safeReport = {
        id: Date.now(), // unique id
        title: result.title || file.name || "Untitled Image",
        description:
          result.description || "Uploaded image sent for anomaly detection.",
        coordinates: result.coordinates || null,
        previewUrl: URL.createObjectURL(file), // so we can preview image
      };

      onUploadComplete(safeReport);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </div>
  );
}

