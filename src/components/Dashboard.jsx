"use client";

import { useEffect, useState } from "react";
import MachineDetail from "./MachineDetail"; // Make sure this path is correct

export default function Dashboard() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedMachine, setSelectedMachine] = useState(null);

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

  const handleRowClick = (machineId, e) => {
    // Don't navigate if clicking on an edit button or input
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
      return;
    }
    setSelectedMachine(machines.find(m => m.id === machineId));
  };

  if (selectedMachine) {
    return (
      <div className="p-4 md:p-6">
        <button 
          onClick={() => setSelectedMachine(null)}
          className="mb-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center"
        >
          <span className="mr-1">←</span> Back to Dashboard
        </button>
        <MachineDetail id={selectedMachine.id} />
      </div>
    );
  }

  if (loading) return <div className="p-4 md:p-6">Loading...</div>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Machine Dashboard</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 md:p-3 border text-sm md:text-base">Machine Name</th>
              <th className="p-2 md:p-3 border text-sm md:text-base">Status</th>
              <th className="p-2 md:p-3 border text-sm md:text-base">Temperature (°C)</th>
              <th className="p-2 md:p-3 border text-sm md:text-base">Energy (kWh)</th>
              <th className="p-2 md:p-3 border text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr 
                key={m.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={(e) => handleRowClick(m.id, e)}
              >
                <td className="p-2 md:p-3 border text-sm md:text-base">
                  {editingId === m.id ? (
                    <input
                      value={editData.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="border rounded px-2 w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="block hover:text-blue-600">
                      {m.name}
                    </span>
                  )}
                </td>
                <td className="p-2 md:p-3 border text-sm md:text-base">
                  {editingId === m.id ? (
                    <select
                      value={editData.status}
                      onChange={(e) => handleEditChange("status", e.target.value)}
                      className="border rounded px-2 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="Running">Running</option>
                      <option value="Stopped">Stopped</option>
                    </select>
                  ) : (
                    <span className={`inline-block px-2 py-1 rounded text-xs ${m.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {m.status}
                    </span>
                  )}
                </td>
                <td className="p-2 md:p-3 border text-sm md:text-base">
                  {editingId === m.id ? (
                    <input
                      type="number"
                      value={editData.temperature}
                      onChange={(e) => handleEditChange("temperature", e.target.value)}
                      className="border rounded px-2 w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    m.temperature
                  )}
                </td>
                <td className="p-2 md:p-3 border text-sm md:text-base">
                  {editingId === m.id ? (
                    <input
                      type="number"
                      value={editData.energyConsumption}
                      onChange={(e) => handleEditChange("energyConsumption", e.target.value)}
                      className="border rounded px-2 w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    m.energyConsumption
                  )}
                </td>
                <td className="p-2 md:p-3 border text-sm md:text-base" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {editingId === m.id ? (
                      <>
                        <button
                          onClick={() => updateMachine(m.id, editData)}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => updateMachine(m.id, { status: "Running" })}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          Start
                        </button>
                        <button
                          onClick={() => updateMachine(m.id, { status: "Stopped" })}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
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
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}