"use client";

import { useEffect, useState } from "react";
import { getClients, Client } from "@/lib/firebase/clients";
import { addAttendance, getAttendanceByDate, AttendanceRecord } from "@/lib/firebase/attendance";
import { Check, X } from "lucide-react";

export default function AttendancePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [attendance, setAttendance] = useState<Map<string, AttendanceRecord>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const loadData = async (date: string) => {
    setLoading(true);
    try {
      const clientData = await getClients();
      setClients(clientData);
      
      const attendanceData = await getAttendanceByDate(date);
      const attendanceMap = new Map<string, AttendanceRecord>();
      attendanceData.forEach(record => {
        if(record.clientId) attendanceMap.set(record.clientId, record);
      });
      setAttendance(attendanceMap);
    } catch (error) {
      console.error("Failed to load attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleToggle = async (clientId: string, isPresent: boolean) => {
    const existingRecord = attendance.get(clientId);
    const newStatus = existingRecord?.status === (isPresent ? 'present' : 'absent') ? 'unchecked' : (isPresent ? 'present' : 'absent');
    
    await addAttendance({
        clientId,
        date: selectedDate,
        status: newStatus,
    });
    
    // Refresh data after update
    await loadData(selectedDate);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Attendance</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none"
        />
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-500">Loading attendance data...</p>
      ) : clients.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">No Clients Found</h3>
          <p className="text-sm text-gray-500 mt-1">Add clients to start tracking attendance.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg border">
          <ul className="divide-y divide-gray-200">
            {clients.map((client) => {
              const record = attendance.get(client.id!);
              const isPresent = record?.status === 'present';
              const isAbsent = record?.status === 'absent';
              
              return (
                <li key={client.id} className="flex items-center justify-between p-4 flex-wrap">
                  <span className="font-medium text-gray-800">{client.firstName} {client.lastName}</span>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleToggle(client.id!, true)}
                      className={`flex items-center justify-center gap-2 w-24 px-3 py-1.5 rounded-md text-sm transition ${
                        isPresent
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-green-200"
                      }`}
                    >
                      <Check size={16} /> Present
                    </button>
                    <button
                      onClick={() => handleToggle(client.id!, false)}
                      className={`flex items-center justify-center gap-2 w-24 px-3 py-1.5 rounded-md text-sm transition ${
                        isAbsent
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-red-200"
                      }`}
                    >
                      <X size={16} /> Absent
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
