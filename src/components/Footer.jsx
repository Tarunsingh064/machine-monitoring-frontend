// components/Footer.jsx
"use client";
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ArrowUpIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4">MachineMonitor</h3>
            <p className="mb-4">
              Advanced monitoring solutions for industrial equipment performance and predictive maintenance.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Documentation', 'Case Studies'].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Blog', 'Webinars', 'API Docs', 'Community'].map((resource) => (
                <motion.li key={resource} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-white transition-colors">{resource}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <a href="mailto:info@machinemonitor.com" className="hover:text-white">info@machinemonitor.com</a>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <span>123 Industrial Way, Tech City</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MachineMonitor. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 md:mt-0 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}