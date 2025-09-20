// components/ReportCard.js
export default function ReportCard({ report }) {
  return (
    <div className="p-4 border rounded shadow-md my-2 bg-gray-50">
      <h3 className="font-bold text-lg">{report.title}</h3>
      <p>{report.content}</p>
      <a href={report.s3_url} target="_blank" className="text-blue-500 underline">
        Download Full Report
      </a>
    </div>
  );
}
