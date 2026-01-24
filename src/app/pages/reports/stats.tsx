import React, { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define TypeScript Interfaces
interface TransactionData {
  year: number;
  month: number;
  totalAmount: number;
}

interface CategoryData {
  _id: string;
  data: TransactionData[];
  totalSum: number;
}

// Transform Data for Line Chart
const transformData = (data: CategoryData[]) => {
  const transformed: { name: string; payIn?: number; subscription?: number; package?: number }[] = [];

  data.forEach((category) => {
    category.data.forEach(({ year, month, totalAmount }) => {
      const monthKey = `${year}-${month.toString().padStart(2, "0")}`;
      const existing = transformed.find((item) => item.name === monthKey);

      if (existing) {
        existing[category._id as "payIn" | "subscription" | "package"] = totalAmount;
      } else {
        transformed.push({
          name: monthKey,
          [category._id]: totalAmount,
        });
      }
    });
  });

  return transformed.sort((a, b) => a.name.localeCompare(b.name));
};

const StatsLineChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ name: string; payIn?: number; subscription?: number; package?: number }[]>([]);
  const [startDate, setStartDate] = useState("2024-08-01");
  const [endDate, setEndDate] = useState("2025-06-30");

  const fetchTransactionData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://adminapi.flexiclean.me/api/v1/reports/payment/transactions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate,
            endDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result?.data) {
        setChartData(transformData(result.data));
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  return (
    <div style={{ width: "100%", height: 450 }}>
      <h2 className="text-lg font-bold text-center mb-4">Transaction Statistics (Line Chart)</h2>

      {/* Filter Section */}
      <div className="flex justify-center gap-4 mb-4">
        <label>
          Start Date: 
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1"
          />
        </label>
        <label>
          End Date: 
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1"
          />
        </label>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="payIn" stroke="#8884d8" name="Pay In" strokeWidth={2} />
          <Line type="monotone" dataKey="subscription" stroke="#82ca9d" name="Subscription" strokeWidth={2} />
          <Line type="monotone" dataKey="package" stroke="#ffc658" name="Package" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsLineChart;
