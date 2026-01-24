// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// interface TransactionData {
//   year: number;
//   month: number;
//   totalAmount: number;
// }

// interface CategoryData {
//   _id: string;
//   data: TransactionData[];
//   totalSum: number;
// }

// interface ChartProps {
//   chartData: CategoryData[];
//   selectedLine: string | null;
//   handleLegendClick: (e: any) => void;
// }

// // Utility: Convert month number to string like "Jan", "Feb"
// const getMonthName = (month: number) =>
//   new Date(2000, month - 1).toLocaleString('default', { month: 'short' });

// const transformData = (data: CategoryData[]) => {
//   const result: {
//     name: string;
//     payIn?: number;
//     subscription?: number;
//     package?: number;
//   }[] = [];

//   data.forEach((category) => {
//     category.data.forEach(({ year, month, totalAmount }) => {
//       const monthKey = `${getMonthName(month)} ${year}`;
//       const existing = result.find((item) => item.name === monthKey);

//       if (existing) {
//         existing[category._id as 'payIn' | 'subscription' | 'package'] = totalAmount;
//       } else {
//         result.push({
//           name: monthKey,
//           [category._id]: totalAmount,
//         });
//       }
//     });
//   });

//   return result.sort((a, b) => a.name.localeCompare(b.name));
// };

// const Chart: React.FC<ChartProps> = ({ chartData, selectedLine, handleLegendClick }) => {
//   const formattedData = transformData(chartData);



//   return (
//     <ResponsiveContainer width="100%" height={400} className="mt-5">
//       <LineChart data={formattedData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend onClick={handleLegendClick} />
//         {(selectedLine === 'payIn' || !selectedLine) && (
//           <Line type="monotone" dataKey="payIn" stroke="#8884d8" name="Pay In" strokeWidth={2} />
//         )}
//         {(selectedLine === 'subscription' || !selectedLine) && (
//           <Line type="monotone" dataKey="subscription" stroke="#82ca9d" name="Subscription" strokeWidth={2} />
//         )}
//         {(selectedLine === 'package' || !selectedLine) && (
//           <Line type="monotone" dataKey="package" stroke="#ffc658" name="Package" strokeWidth={2} />
//         )}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default Chart;


// Chart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface ChartProps {
  chartData: any[];
  selectedLine: string | null;
  handleLegendClick: (e: any) => void;
}

const Chart: React.FC<ChartProps> = ({ chartData, selectedLine, handleLegendClick }) => {
  return (
    <ResponsiveContainer width="100%" height={400} className="mt-5">
      <LineChart data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend onClick={handleLegendClick} />

  {(selectedLine === "subscription" || !selectedLine) && (
    <Line type="monotone" dataKey="subscription" stroke="#82ca9d" name="Subscription" strokeWidth={2} />
  )}
  {(selectedLine === "package" || !selectedLine) && (
    <Line type="monotone" dataKey="package" stroke="#ffc658" name="Package" strokeWidth={2} />
  )}
</LineChart>

   
       </ResponsiveContainer>
  );
};

export default Chart;
