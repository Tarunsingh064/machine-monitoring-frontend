"use client";

import { useEffect, useState } from "react";
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
import { RotateCw } from "lucide-react"; // 🔄 Refresh icon

const timePoints = ["10:00", "10:10", "10:20", "10:30", "10:40"];

export default function MachineTemperatureChart() {
  const [chartData, setChartData] = useState([]);
  const [machineNames, setMachineNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMachines = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/machines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch machine data");

      const machines = await res.json();
      setMachineNames(machines.map((m) => m.name));

      // Fake historical temperature points per machine
      const formatted = timePoints.map((time, i) => {
        const point = { time };
        machines.forEach((machine) => {
          point[machine.name] =
            machine.temperature + (Math.random() * 4 - 2); // ±2 fluctuation
        });
        return point;
      });

      setChartData(formatted);
    } catch (err) {
      console.error("Chart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Machine Temperature Trends</h2>
        <button
          onClick={fetchMachines}
          disabled={loading}
          className={`flex items-center space-x-1 px-3 py-1 rounded hover:bg-gray-200 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <RotateCw className={`w-5 h-5 ${loading && "animate-spin"}`} />
          <span className="text-sm hidden sm:inline">Refresh</span>
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Legend />
          {machineNames.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={lineColors[index % lineColors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const lineColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a83279"];
