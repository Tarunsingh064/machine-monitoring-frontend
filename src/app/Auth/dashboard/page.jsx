"use client";
import Dashboard from "@/components/Dashboard";
import MachineTemperatureChart from "@/components/MachineTemperatureChart";
import { useAuth } from '@/context/Authcontext';
import { useEffect }  from "react";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const {  user,logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Other content... */}
      <button 
                onClick={() => {
                  logout();
                  
                }} 
                className="px-4 py-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-300"
              >
                Logout
              </button>
      <Dashboard/>
      
      <MachineTemperatureChart />
    </div>
  );
}