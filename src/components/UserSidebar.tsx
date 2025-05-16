"use client";

import { motion } from "framer-motion";
import { X, PhoneCall, Mail } from "lucide-react";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-md bg-gradient-to-br from-white via-slate-50 to-gray-100 h-full shadow-2xl p-6 overflow-y-auto "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={28} />
        </button>

        {/* User Info */}
        <div className="flex flex-col items-center text-center mt-12 space-y-4">
          <img
            src="/jenil.jpg"
            alt="User"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Samuel Browick
          </h2>
          <div className="flex items-center space-x-2 text-green-500 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Billing Executive</span>
          </div>
          <div className="text-gray-600 text-sm">+91 9512009420</div>
          <div className="text-blue-500 text-sm underline">
            sbrow@billingcorp.com
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition">
              <PhoneCall size={18} /> Call
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-100 text-blue-700 rounded-lg shadow hover:bg-blue-200 transition">
              <Mail size={18} /> Email
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8" />

        {/* Billing History */}
        <div className="space-y-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">
            Recent Transactions
          </h3>

          {/* Invoice Card */}
          <div className="p-4 rounded-2xl bg-white shadow hover:shadow-md transition space-y-2">
            <div className="text-sm text-gray-500">
              Invoice Date:{" "}
              <span className="font-medium text-gray-800">03/06/2025</span>
            </div>
            <div className="text-sm text-gray-500">
              Invoice No:{" "}
              <span className="font-medium text-gray-800">INV-01245</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm pt-2">
              <div>
                Amount:{" "}
                <span className="font-semibold text-gray-900">₹8,500</span>
              </div>
              <div>Status: <span className="font-semibold text-green-600">Paid</span></div>
            </div>
          </div>

          {/* Another Invoice Card */}
          <div className="p-4 rounded-2xl bg-white shadow hover:shadow-md transition space-y-2">
            <div className="text-sm text-gray-500">
              Invoice Date:{" "}
              <span className="font-medium text-gray-800">02/18/2025</span>
            </div>
            <div className="text-sm text-gray-500">
              Invoice No:{" "}
              <span className="font-medium text-gray-800">INV-01198</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm pt-2">
              <div>
                Amount:{" "}
                <span className="font-semibold text-gray-900">₹12,300</span>
              </div>
              <div>Status: <span className="font-semibold text-yellow-600">Pending</span></div>
            </div>
          </div>

          {/* Add more billing entries if needed */}
        </div>
      </motion.div>
    </div>
  );
}
