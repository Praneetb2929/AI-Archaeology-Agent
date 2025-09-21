import "../styles/globals.css";


export const metadata = {
  title: "AI Archaeology Agent",
  description: "Detect archaeological anomalies from satellite images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
