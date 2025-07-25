"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MachineDetail({ id }) {
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchMachine = async () => {
    if (!id) {
      setError("No machine ID provided");
      setLoading(false);
      return;
    }

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
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateMachine = async (updatedFields) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/machines/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditingId(null);
      fetchMachine();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (id) {
      fetchMachine();
      const interval = setInterval(fetchMachine, 10000);
      return () => clearInterval(interval);
    }
  }, [id]);

  if (!id) return <div className="p-4 md:p-6">No machine selected</div>;
  if (loading) return <div className="p-4 md:p-6">Loading...</div>;
  if (error) return <div className="p-4 md:p-6">Error: {error}</div>;
  if (!machine) return <div className="p-4 md:p-6">Machine not found</div>;

  const temperatureData = [
    { time: "10:00", temp: machine.temperature - 4 },
    { time: "10:10", temp: machine.temperature - 2 },
    { time: "10:20", temp: machine.temperature },
    { time: "10:30", temp: machine.temperature + 1 },
    { time: "10:40", temp: machine.temperature - 1 },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{machine.name}</h2>
        {editingId && (
          <div className="flex gap-2">
            <button
              onClick={() => updateMachine(editData)}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Machine Details</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">Status</td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base">
                    {editingId ? (
                      <select
                        value={editData.status || machine.status}
                        onChange={(e) => handleEditChange("status", e.target.value)}
                        className="border rounded px-2 w-full"
                      >
                        <option value="Running">Running</option>
                        <option value="Stopped">Stopped</option>
                      </select>
                    ) : (
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        machine.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {machine.status}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">Temperature</td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base">
                    {editingId ? (
                      <input
                        type="number"
                        value={editData.temperature ?? machine.temperature}
                        onChange={(e) => handleEditChange("temperature", e.target.value)}
                        className="border rounded px-2 w-full"
                      />
                    ) : (
                      `${machine.temperature} °C`
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">Energy</td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base">
                    {editingId ? (
                      <input
                        type="number"
                        value={editData.energyConsumption ?? machine.energyConsumption}
                        onChange={(e) => handleEditChange("energyConsumption", e.target.value)}
                        className="border rounded px-2 w-full"
                      />
                    ) : (
                      `${machine.energyConsumption} kWh`
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">Last Maintenance</td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base">
                    {machine.lastMaintenance || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">Location</td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base">
                    {machine.location || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-2">
            {!editingId ? (
              <>
                <button
                  onClick={() => updateMachine({ status: "Running" })}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Start
                </button>
                <button
                  onClick={() => updateMachine({ status: "Stopped" })}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Stop
                </button>
                <button
                  onClick={() => {
                    setEditingId(id);
                    setEditData({
                      status: machine.status,
                      temperature: machine.temperature,
                      energyConsumption: machine.energyConsumption,
                    });
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
              </>
            ) : null}
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Temperature Trends</h3>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis unit="°C" />
                <Tooltip 
                  formatter={(value) => [`${value} °C`, "Temperature"]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#8884d8" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}