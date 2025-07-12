"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Lun",
    present: 95,
    absent: 8,
  },
  {
    name: "Mar",
    present: 92,
    absent: 12,
  },
  {
    name: "Mer",
    present: 88,
    absent: 15,
  },
  {
    name: "Jeu",
    present: 94,
    absent: 9,
  },
  {
    name: "Ven",
    present: 89,
    absent: 14,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Présences de la Semaine</h1>
        <Image src="/moreDark.png" alt="Plus d'options" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            formatter={(value, name) => [
              `${value}%`,
              name === 'present' ? 'Présents' : 'Absents'
            ]}
            labelFormatter={(label) => `${label}`}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="#C3EBFA"
            legendType="circle"
            radius={[0, 0, 0, 0]}
            name="Présents"
          />
          <Bar
            dataKey="absent"
            fill="#FAE27C"
            legendType="circle"
            radius={[0, 0, 0, 0]}
            name="Absents"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;