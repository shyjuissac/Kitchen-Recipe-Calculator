import { useEffect, useState } from "react";

type RevenueReport = {
  total_sales: string;
  average_sales: string;
  total_orders: number;
};

function Revenue() {
  const [report, setReport] = useState<RevenueReport | null>(null);

  useEffect(() => {
    fetch("/api/revenue")
      .then((res) => res.json())
      .then((data) => setReport(data));
  }, []);

  if (!report) return <p>Loading revenue...</p>;

  return (
    <div>
      <h2>Revenue Report</h2>
      <p>Total sales: {report.total_sales}</p>
      <p>Average order: {report.average_sales}</p>
      <p>Total orders: {report.total_orders}</p>
    </div>
  );
}

export default Revenue;
