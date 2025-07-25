// components/HeroSection.jsx
"use client";

// components/HeroSection.jsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowPathIcon, CpuChipIcon, ChartBarSquareIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/30"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Intelligent Machine Monitoring
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Real-time analytics, predictive maintenance, and performance optimization for your industrial equipment.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
          >
            <Link href="/signup">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30">
                Live Demo
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl"
        >
          <div className="p-4 border-b border-gray-700/50 flex items-center bg-gray-800/30">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-gray-400 ml-4">machine-monitor-dashboard</div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Sample metrics */}
              {[
                { value: '98.7%', label: 'Uptime', change: '+0.5%', icon: <ChartBarSquareIcon className="w-6 h-6 text-blue-400" /> },
                { value: '24°C', label: 'Avg Temp', change: '-2°', icon: <CpuChipIcon className="w-6 h-6 text-green-400" /> },
                { value: '12ms', label: 'Response', change: '±0', icon: <ArrowPathIcon className="w-6 h-6 text-purple-400" /> },
              ].map((metric, i) => (
                <div key={i} className="bg-gray-800/70 rounded-xl p-5 border border-gray-700/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-gray-400 text-sm">{metric.label}</div>
                      <div className="text-2xl font-bold mt-1">{metric.value}</div>
                      <div className="text-xs mt-1 text-green-400">{metric.change}</div>
                    </div>
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      {metric.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sample graph */}
            <div className="bg-gray-800/70 rounded-xl p-5 border border-gray-700/50 h-64">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Machine Performance (Last 24h)</h3>
                <div className="text-xs text-gray-400">Updated just now</div>
              </div>
              <div className="h-44 w-full relative">
                {/* Graph visualization placeholder */}
                <div className="absolute inset-0 flex items-end space-x-1">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const height = 20 + Math.sin(i / 2) * 60 + Math.random() * 20;
                    const color = height > 70 ? 'bg-red-500' : height > 50 ? 'bg-yellow-500' : 'bg-green-500';
                    return (
                      <div 
                        key={i}
                        className={`${color} w-3 rounded-t-sm transition-all duration-300 hover:opacity-80`}
                        style={{ height: `${height}%` }}
                        title={`Hour ${i}: ${Math.round(height)}% utilization`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Everything you need to optimize your machine operations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ChartBarSquareIcon className="w-10 h-10 text-blue-400" />,
                title: "Real-time Analytics",
                description: "Monitor performance metrics with millisecond precision across all your equipment"
              },
              {
                icon: <ShieldCheckIcon className="w-10 h-10 text-green-400" />,
                title: "Predictive Maintenance",
                description: "AI-powered alerts before failures occur, reducing downtime by up to 45%"
              },
              {
                icon: <CpuChipIcon className="w-10 h-10 text-purple-400" />,
                title: "Multi-machine Support",
                description: "Centralized monitoring for your entire fleet regardless of manufacturer"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gray-700/30 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}