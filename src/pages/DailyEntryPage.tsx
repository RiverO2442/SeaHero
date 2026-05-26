import React, { useState } from "react";
import { KpiCards } from "../components/KpiCards";
import { AttendanceTable } from "../components/AttendanceTable";
import {
  RecentAdjustments,
  DepartmentDistribution,
} from "../components/InfoPanels";
import type {
  Employee,
  AttendanceStatus,
  Adjustment,
  DepartmentStat,
} from "../components/types";

// â”€â”€â”€ Seed Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Julian Wan",
    email: "julian.w@salarypro.com",
    department: "Engineering",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbJvpQQMqS7gCt18Rh-eJXOQ6Y0J3QFkfSPklBmvP9zef8551qfHJ5l6ATbBl-qR1TvpUHJrCmHGnTFhF5bq9FhoOfJC8mgWanQRj6j8V9GofnfuMA-hfUX8ucLRoa-J7j5vL9nKXNL2S5gNws_hVRFdJUvHzx3g1WDlxAa8xFghKvz0FuzElL4eMQPzNyy3rqh-2-5m0znptQo_Kwv5kL10sKyHZ3BRWUH-xNJ6vybHEF3OGihnugqynZ69tLGi5YPm7MUcUy-uc",
    status: "Present",
    hoursWorked: 8,
    dailyRate: 65,
  },
  {
    id: "2",
    name: "Sasha Ho",
    email: "sasha.h@salarypro.com",
    department: "Marketing",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-hvzT97fYPFVSZxwa15GfNxqidYrYVVMqkbMnO7YOsG99ghqi07wwF3nEynnGB31sIOf-q8G74lfiK6hozUaFc126cifFwyzCgfQaNDaj6ZKVLQ7g5w98iYCWihE4U-UEkcX1eeiXxDtoFN-X9Xv-Y-mPTgwNrikcNbTjy69V1rdGFnTi7fKMW8ekqIKT73WP-ryspJYhrqoDrMEJE7H1TUbK9B7Jt5U8O6s4ZyCdS392jtdFd0ZrGtvnwUCPtSlPRDgz07HOFc",
    status: "Half-day",
    hoursWorked: 4,
    dailyRate: 48,
  },
  {
    id: "3",
    name: "Michael Kholin",
    email: "michael.k@salarypro.com",
    department: "Product",
    initials: "MK",
    status: "Present",
    hoursWorked: 9,
    dailyRate: 55,
  },
  {
    id: "4",
    name: "David Smith",
    email: "david.s@salarypro.com",
    department: "Engineering",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCsMVtvX9G7_rTc_POX8B04JKs_bwaHz-Bq7dy-yb3uC7buNtOS_pmC6VegRzT8RFWZ-BXGnRM3G_OyxMg8c0ZlHliClNMs5bFc9leO8SXhxVmrRlG62KBHBbuBItyqHGodx13CtBt52MUvDK5iY8EsKA-1EirN_qi8o1jFGh_pyKY1y9lEIJt9uAtZlU1Z0u7d0s7ZcWBW3Q8aaD3cLAYNZ7NWa1h0KJwDGJlsHSDdHHi_1z6JcFn1Yg1O6bG-D87V7vzQMgUBkc",
    status: "Absent",
    hoursWorked: 0,
    dailyRate: 65,
  },
];

const ADJUSTMENTS: Adjustment[] = [
  {
    id: "1",
    type: "overtime",
    title: "Overtime Approved: Sasha Ho",
    detail: "Marketing â€¢ Added 2.5 hours for Campaign Launch",
    time: "14:20 PM",
  },
  {
    id: "2",
    type: "correction",
    title: "Status Correction: Michael Kholin",
    detail: "Changed from Absent to Present by Admin",
    time: "09:15 AM",
  },
];

const DEPARTMENT_STATS: DepartmentStat[] = [
  { name: "Engineering", percentage: 65, colorClass: "bg-blue-600" },
  { name: "Marketing", percentage: 25, colorClass: "bg-purple-600" },
  { name: "Others", percentage: 10, colorClass: "bg-slate-300" },
];

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DailyEntryPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevDay = () => {
    setCurrentDate((d) => {
      const prev = new Date(d);
      prev.setDate(prev.getDate() - 1);
      return prev;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((d) => {
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  const isToday = currentDate.toDateString() === new Date().toDateString();

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status,
              hoursWorked: status === "Absent" ? 0 : emp.hoursWorked,
            }
          : emp,
      ),
    );
  };

  const handleHoursChange = (id: string, hours: number) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, hoursWorked: hours } : emp)),
    );
  };

  const handleMarkAllPresent = () => {
    setEmployees((prev) =>
      prev.map((emp) => ({
        ...emp,
        status: "Present" as AttendanceStatus,
        hoursWorked: emp.hoursWorked === 0 ? 8 : emp.hoursWorked,
      })),
    );
  };

  const handleMarkAllAbsent = () => {
    setEmployees((prev) =>
      prev.map((emp) => ({
        ...emp,
        status: "Absent" as AttendanceStatus,
        hoursWorked: 0,
      })),
    );
  };

  const handleDraftSave = () => {
    const key = `attendance_draft_${currentDate.toISOString().slice(0, 10)}`;
    localStorage.setItem(key, JSON.stringify(employees));
    console.log("Draft saved to localStorage:", key);
  };

  const handleCommit = () => {
    const key = `attendance_committed_${currentDate.toISOString().slice(0, 10)}`;
    localStorage.setItem(key, JSON.stringify(employees));
    const draftKey = `attendance_draft_${currentDate.toISOString().slice(0, 10)}`;
    localStorage.removeItem(draftKey);
    console.log("Entries committed:", key);
  };

  return (
    <>
      {/* Page header */}
      <section className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Daily Attendance
          </h1>
          <p className="text-slate-500 font-medium">
            Manage and log daily work hours for your global workforce.
          </p>
        </div>

        {/* Date picker */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)]">
          <button onClick={handlePrevDay} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-1">
            <span className="material-symbols-outlined text-blue-600">
              calendar_today
            </span>
            <span className="font-bold text-slate-800">{formattedDate}</span>
          </div>
          <button onClick={handleNextDay} disabled={isToday} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>

      {/* KPI cards */}
      <KpiCards employees={employees} />

      {/* Attendance table */}
      <AttendanceTable
        employees={employees}
        onStatusChange={handleStatusChange}
        onHoursChange={handleHoursChange}
        onMarkAllPresent={handleMarkAllPresent}
        onMarkAllAbsent={handleMarkAllAbsent}
        onDraftSave={handleDraftSave}
        onCommit={handleCommit}
      />

      {/* Bottom info panels */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentAdjustments adjustments={ADJUSTMENTS} />
        <DepartmentDistribution stats={DEPARTMENT_STATS} activeCount={128} />
      </section>
    </>
  );
};

export default DailyEntryPage;
