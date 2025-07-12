"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 1234,
    fill: "white",
  },
  {
    name: "Filles",
    count: 555,
    fill: "#FAE27C",
  },
  {
    name: "Garçons",
    count: 679,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITRE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Répartition des Élèves</h1>
        <Image src="/moreDark.png" alt="Plus d'options" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="Répartition par genre"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* STATISTIQUES */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-dacSky rounded-full" />
          <h1 className="font-bold">679</h1>
          <h2 className="text-xs text-gray-500">Garçons (55%)</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-dacYellow rounded-full" />
          <h1 className="font-bold">555</h1>
          <h2 className="text-xs text-gray-500">Filles (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;