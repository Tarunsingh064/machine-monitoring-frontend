"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MachineDetail() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMachine = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/machines/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch machine details");
      const data = await res.json();
      setMachine(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachine();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!machine) return <div className="p-6">Machine not found</div>;

  // Fake temperature history for demo chart
  const temperatureData = [
    { time: "10:00", temp: machine.temperature - 4 },
    { time: "10:10", temp: machine.temperature - 2 },
    { time: "10:20", temp: machine.temperature },
    { time: "10:30", temp: machine.temperature + 1 },
    { time: "10:40", temp: machine.temperature - 1 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{machine.name}</h2>
      <div className="mb-6">
        <p><strong>Status:</strong> {machine.status}</p>
        <p><strong>Temperature:</strong> {machine.temperature} °C</p>
        <p><strong>Energy Consumption:</strong> {machine.energyConsumption} kWh</p>
      </div>

      <h3 className="text-2xl font-semibold mb-2">Temperature Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={temperatureData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
