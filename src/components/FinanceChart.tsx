"use client";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 45000,
    expense: 38000,
  },
  {
    name: "Fév",
    income: 42000,
    expense: 35000,
  },
  {
    name: "Mar",
    income: 48000,
    expense: 41000,
  },
  {
    name: "Avr",
    income: 46000,
    expense: 39000,
  },
  {
    name: "Mai",
    income: 44000,
    expense: 37000,
  },
  {
    name: "Jun",
    income: 41000,
    expense: 34000,
  },
  {
    name: "Jul",
    income: 38000,
    expense: 32000,
  },
  {
    name: "Aoû",
    income: 35000,
    expense: 30000,
  },
  {
    name: "Sep",
    income: 50000,
    expense: 43000,
  },
  {
    name: "Oct",
    income: 47000,
    expense: 40000,
  },
  {
    name: "Nov",
    income: 45000,
    expense: 38000,
  },
  {
    name: "Déc",
    income: 43000,
    expense: 36000,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finances de l&apos;École</h1>
        <Image src="/moreDark.png" alt="Plus d'options" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip
            formatter={(value, name) => [
              `${value.toLocaleString('fr-FR')} €`,
              name === 'income' ? 'Revenus' : 'Dépenses'
            ]}
            labelFormatter={(label) => `Mois: ${label}`}
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            strokeWidth={3}
            name="Revenus"
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={3}
            name="Dépenses"
            dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;