"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchMachines = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/machines", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch machines");
      const data = await res.json();
      setMachines(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
    const interval = setInterval(fetchMachines, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateMachine = async (id, updatedFields) => {
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
      fetchMachines();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Machine Dashboard</h1>
      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Machine Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Temperature (°C)</th>
            <th className="p-2 border">Energy (kWh)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((m) => (
            <tr key={m.id} className="hover:bg-gray-100">
              <td className="p-2 border">
                {editingId === m.id ? (
                  <input
                    value={editData.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    className="border rounded px-2"
                  />
                ) : (
                  m.name
                )}
              </td>
              <td className="p-2 border">
                {editingId === m.id ? (
                  <select
                    value={editData.status}
                    onChange={(e) => handleEditChange("status", e.target.value)}
                    className="border rounded px-2"
                  >
                    <option value="Running">Running</option>
                    <option value="Stopped">Stopped</option>
                  </select>
                ) : (
                  m.status
                )}
              </td>
              <td className="p-2 border">
                {editingId === m.id ? (
                  <input
                    type="number"
                    value={editData.temperature}
                    onChange={(e) => handleEditChange("temperature", e.target.value)}
                    className="border rounded px-2"
                  />
                ) : (
                  m.temperature
                )}
              </td>
              <td className="p-2 border">
                {editingId === m.id ? (
                  <input
                    type="number"
                    value={editData.energyConsumption}
                    onChange={(e) => handleEditChange("energyConsumption", e.target.value)}
                    className="border rounded px-2"
                  />
                ) : (
                  m.energyConsumption
                )}
              </td>
              <td className="p-2 border space-x-2">
                {editingId === m.id ? (
                  <>
                    <button
                      onClick={() => updateMachine(m.id, editData)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => updateMachine(m.id, { status: "Running" })}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Start
                    </button>
                    <button
                      onClick={() => updateMachine(m.id, { status: "Stopped" })}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Stop
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(m.id);
                        setEditData({
                          name: m.name,
                          status: m.status,
                          temperature: m.temperature,
                          energyConsumption: m.energyConsumption,
                        });
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
