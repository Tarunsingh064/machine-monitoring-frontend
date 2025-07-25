import Dashboard from "@/components/Dashboard";
import MachineDetail from "@/components/MachineDetail";
import MachineTemperatureChart from "@/components/MachineTemperatureChart";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Other content... */}
      <Dashboard/>
      <MachineDetail/>
      <MachineTemperatureChart />
    </div>
  );
}
