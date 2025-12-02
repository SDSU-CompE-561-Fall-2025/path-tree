"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  code: string;
  title: string;
  units: number;
};

type Major = {
  id: string;
  name: string;
  department: string;
  requiredCourses: Course[];
};

const MOCK_MAJORS: Major[] = [
  {
    id: "cs",
    name: "Computer Science",
    department: "College of Engineering",
    requiredCourses: [
      { id: "1", code: "CS-101", title: "Intro to Computer Science", units: 3 },
      { id: "2", code: "CS-210", title: "Data Structures", units: 3 },
      { id: "3", code: "CS-310", title: "Algorithms", units: 3 },
      { id: "4", code: "CS-320", title: "Software Engineering", units: 3 },
      { id: "5", code: "MATH-201", title: "Calculus I", units: 4 },
      { id: "6", code: "MATH-202", title: "Calculus II", units: 4 },
      { id: "7", code: "EE-250", title: "Digital Logic", units: 3 },
      { id: "8", code: "CS-490", title: "Senior Project", units: 3 },
    ],
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    department: "College of Engineering",
    requiredCourses: [
      { id: "9", code: "EE-101", title: "Intro to Electrical Engineering", units: 3 },
      { id: "10", code: "EE-250", title: "Digital Logic", units: 3 },
      { id: "11", code: "EE-310", title: "Circuits and Systems", units: 4 },
      { id: "12", code: "EE-320", title: "Signals and Systems", units: 3 },
      { id: "13", code: "MATH-201", title: "Calculus I", units: 4 },
      { id: "14", code: "MATH-202", title: "Calculus II", units: 4 },
      { id: "15", code: "PHYS-201", title: "Physics I", units: 4 },
      { id: "16", code: "EE-490", title: "Senior Design", units: 3 },
    ],
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    department: "College of Engineering",
    requiredCourses: [
      { id: "17", code: "ME-101", title: "Intro to Mechanical Engineering", units: 3 },
      { id: "18", code: "ME-220", title: "Thermodynamics", units: 3 },
      { id: "19", code: "ME-310", title: "Fluid Mechanics", units: 3 },
      { id: "20", code: "ME-320", title: "Mechanics of Materials", units: 3 },
      { id: "21", code: "MATH-201", title: "Calculus I", units: 4 },
      { id: "22", code: "MATH-202", title: "Calculus II", units: 4 },
      { id: "23", code: "PHYS-201", title: "Physics I", units: 4 },
      { id: "24", code: "ME-490", title: "Senior Design", units: 3 },
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    department: "College of Sciences",
    requiredCourses: [
      { id: "25", code: "MATH-201", title: "Calculus I", units: 4 },
      { id: "26", code: "MATH-202", title: "Calculus II", units: 4 },
      { id: "27", code: "MATH-301", title: "Multivariable Calculus", units: 4 },
      { id: "28", code: "MATH-310", title: "Linear Algebra", units: 3 },
      { id: "29", code: "MATH-320", title: "Differential Equations", units: 3 },
      { id: "30", code: "MATH-410", title: "Real Analysis", units: 3 },
      { id: "31", code: "MATH-420", title: "Abstract Algebra", units: 3 },
      { id: "32", code: "MATH-490", title: "Senior Seminar", units: 3 },
    ],
  },
];

export default function ProgramOfStudyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  const filteredMajors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MOCK_MAJORS;
    return MOCK_MAJORS.filter(
      (major) =>
        major.name.toLowerCase().includes(query) ||
        major.department.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalUnits = selectedMajor
    ? selectedMajor.requiredCourses.reduce((sum, c) => sum + c.units, 0)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Program of Study</h1>
        <p className="text-sm text-muted-foreground">
          Search and view required courses for different majors
        </p>
      </header>

      {/* Major Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Search Majors</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          placeholder="Search by major name or department..."
          className={cn(
            "w-full rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary/40"
          )}
        />
      </div>

      {/* Major Selection Grid */}
      {!selectedMajor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredMajors.map((major) => (
            <button
              key={major.id}
              onClick={() => setSelectedMajor(major)}
              className="text-left p-4 rounded-md border bg-background hover:bg-accent transition-colors"
            >
              <div className="font-medium text-lg">{major.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{major.department}</div>
              <div className="text-xs text-muted-foreground mt-2">
                {major.requiredCourses.length} required courses
              </div>
            </button>
          ))}
          {filteredMajors.length === 0 && (
            <div className="col-span-2 text-center py-8 text-muted-foreground">
              No majors found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Selected Major Details */}
      {selectedMajor && (
        <>
          <div className="mb-6 p-4 rounded-md border bg-muted/20">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-semibold">{selectedMajor.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedMajor.department}</p>
              </div>
              <button
                onClick={() => setSelectedMajor(null)}
                className="text-sm text-primary hover:underline"
              >
                Change Major
              </button>
            </div>
            <div className="text-sm mt-3">
              <span className="font-medium">Total Units Required:</span> {totalUnits} units
            </div>
          </div>

          <section>
            <h3 className="text-lg font-medium mb-4">Required Courses</h3>

            <ul className="space-y-3">
              {selectedMajor.requiredCourses.map((course) => (
                <li
                  key={course.id}
                  className="flex items-center justify-between rounded-md border p-4 bg-background"
                >
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-medium">{course.code}</span>
                      <span className="text-sm text-muted-foreground">{course.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{course.units} units</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <footer className="mt-8 text-sm text-muted-foreground">
        This page uses mock data — wiring to the backend API can be added next.
      </footer>
    </div>
  );
}
