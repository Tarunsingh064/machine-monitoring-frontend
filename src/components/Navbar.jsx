// components/Navbar.jsx
"use client";
import Link from 'next/link';
import { useAuth } from '@/context/Authcontext';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-gray-900 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            onClick={handleLinkClick}
          >
            MachineMonitor
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:text-blue-300 transition-colors duration-200"
            >
              Home
            </Link>
            {user && (
              <Link 
                href="/Auth/dashboard" 
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
            {!user ? (
              <>
                <Link 
                  href="/Auth/login" 
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  href="/Auth/signup" 
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button 
                onClick={() => {
                  logout();
                  handleLinkClick();
                }} 
                className="px-4 py-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-300"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link 
              href="/" 
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            {user && (
              <Link 
                href="/dashboard" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
            )}
            {!user ? (
              <>
                <Link 
                  href="/Auth/login" 
                  className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link 
                  href="/Auth/signup" 
                  className="px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center"
                  onClick={handleLinkClick}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button 
                onClick={() => {
                  logout();
                  handleLinkClick();
                }} 
                className="px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700 text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}