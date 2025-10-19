"use client";

import { Truck } from "lucide-react";

export default function TransportationPage() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Transportation</h2>
        <div className="text-center py-20 px-4 border-2 border-dashed rounded-lg">
          <Truck size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">Transportation Module</h3>
          <p className="text-sm text-gray-500 mt-1">This feature is under construction. Manage routes and vehicle assignments here in the future.</p>
        </div>
      </div>
    );
}
