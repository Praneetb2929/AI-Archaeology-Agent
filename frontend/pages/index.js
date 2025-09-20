import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import MapView from "../components/MapView";
import ReportCard from "../components/ReportCard";
import axios from "axios";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  const handleUploadComplete = async (data) => {
    // Call backend Lambda to analyze image
    const res = await axios.post("/api/getReports", { image_key: data.key });
    setReports(res.data.reports);
    setAnomalies(res.data.anomalies);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">EcoAgent – AI Archaeology/Environmental Agent</h1>
      <ImageUploader onUploadComplete={handleUploadComplete} />
      <h2 className="mt-6 text-xl font-semibold">Detected Anomalies:</h2>
      <MapView anomalies={anomalies} />
      <h2 className="mt-6 text-xl font-semibold">Reports:</h2>
      {reports.map((r, idx) => (
        <ReportCard key={idx} report={r} />
      ))}
    </div>
  );
}
