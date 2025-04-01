
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

const data = [
  { name: 'Mon', sales: 1200, customers: 80 },
  { name: 'Tue', sales: 1400, customers: 95 },
  { name: 'Wed', sales: 1300, customers: 85 },
  { name: 'Thu', sales: 1500, customers: 110 },
  { name: 'Fri', sales: 1800, customers: 130 },
  { name: 'Sat', sales: 2400, customers: 180 },
  { name: 'Sun', sales: 2100, customers: 160 },
];

export const DashboardSalesChart: React.FC = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888888" />
          <YAxis 
            yAxisId="left" 
            stroke="#888888" 
            tickFormatter={(value) => `$${value}`} 
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#888888" 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              borderColor: "#e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value, name) => {
              if (name === "sales") return [`$${value}`, "Sales"];
              return [value, "Customers"];
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke="#FF9A8B"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="Sales ($)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="customers"
            stroke="#88D8B0"
            strokeWidth={3}
            name="Customers"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
