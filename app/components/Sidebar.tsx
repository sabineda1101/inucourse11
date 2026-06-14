"use client";

import { MENU_DATA, UNIVERSITY_DATA } from "@/app/constants/menu";
import { useState } from "react";
import { ChevronDown, ChevronRight, LayoutDashboard, ExternalLink, GraduationCap, BookOpen, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current active parameters
  const currentCollege = searchParams.get("college");
  const currentDept = searchParams.get("department");
  const currentArea = searchParams.get("area");
  const currentType = searchParams.get("type");

  // Initialize all college sections as open (expanded) by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {
      "기초교양": false,
      "핵심교양": false,
      "심화교양": false,
    };
    UNIVERSITY_DATA.forEach((col) => {
      initial[col.name] = true;
    });
    return initial;
  });

  if (pathname?.startsWith("/auth")) return null;

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isDashboardActive = pathname === "/dashboard";

  return (
    <aside className="w-[280px] h-[calc(100vh-32px)] bg-white/95 text-gray-700 rounded-2xl flex flex-col m-4 overflow-hidden shadow-lg border border-gray-200/80 shrink-0 sticky top-4">
      {/* Header matching screenshot */}
      <div className="px-6 py-6 border-b border-gray-100 flex flex-col">
        <span className="font-bold text-gray-900 text-[18px] tracking-tight leading-tight">
          Incheon National
        </span>
        <span className="font-bold text-gray-900 text-[18px] tracking-tight leading-tight">
          University
        </span>
        <span className="text-gray-400 text-xs font-medium mt-1">
          2026-1 Course Dashboard
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-4 custom-scrollbar">
        {/* 전체 대시보드 Link */}
        <div>
          <Link
            href="/dashboard"
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isDashboardActive
                ? "bg-[#eef2ff] text-[#4f46e5]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <LayoutDashboard size={18} className={isDashboardActive ? "text-[#4f46e5]" : "text-gray-400"} />
            <span>전체 대시보드</span>
          </Link>
        </div>

        <div className="border-t border-gray-100 my-2 pt-2">
          {/* 대학(학부) Header Title */}
          <div className="px-4 py-1 text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">
            대학(학부)
          </div>

          <div className="space-y-1">
            {UNIVERSITY_DATA.map((college) => {
              const isOpen = openSections[college.name];
              const hasDepts = college.departments.length > 0;
              const isColActive = currentCollege === college.name;

              // Check if 기초교육원 or 대학전체 or external
              if (college.isExternal) {
                return (
                  <a
                    key={college.name}
                    href={college.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span>{college.name}</span>
                    </div>
                    <ExternalLink size={12} className="text-gray-400" />
                  </a>
                );
              }

              if (college.name === "대학전체") {
                const isAllActive = pathname === "/courses" && !currentCollege && !currentDept && !currentArea && !currentType;
                return (
                  <Link
                    key={college.name}
                    href={college.href}
                    className={`w-full flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isAllActive
                        ? "bg-[#eef2ff] text-[#4f46e5] font-bold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isAllActive ? "bg-[#4f46e5]" : "bg-gray-300"}`} />
                      <span>{college.name}</span>
                    </div>
                  </Link>
                );
              }

              return (
                <div key={college.name} className="flex flex-col">
                  {/* College Header */}
                  <div className="flex items-center justify-between w-full group">
                    <Link
                      href={college.href}
                      className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                        isColActive
                          ? "bg-gray-100 text-gray-900 font-bold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                      <span className="truncate">{college.name}</span>
                    </Link>
                    
                    {hasDepts && (
                      <button
                        onClick={() => toggleSection(college.name)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mr-1"
                      >
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                    )}
                  </div>

                  {/* Departments List (All Expanded by Default) */}
                  {hasDepts && isOpen && (
                    <div className="ml-7 pl-3 border-l border-gray-100 flex flex-col mt-0.5 mb-1 space-y-0.5">
                      {college.departments.map((dept) => {
                        const isDeptActive = currentDept === dept;
                        return (
                          <Link
                            key={dept}
                            href={`/courses?department=${encodeURIComponent(dept)}`}
                            className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all truncate ${
                              isDeptActive
                                ? "text-[#4f46e5] bg-[#eef2ff]/50 font-bold"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {dept}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* General Education Categories */}
        <div className="border-t border-gray-100 pt-3">
          <div className="px-4 py-1 text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1">
            교양 교육과정
          </div>
          
          {Object.entries(MENU_DATA).map(([category, items]) => {
            const isOpen = openSections[category];
            return (
              <div key={category} className="mb-1 last:mb-0">
                <button
                  onClick={() => toggleSection(category)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} className="text-gray-400" />
                    <span>{category}</span>
                  </div>
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {isOpen && (
                  <div className="ml-7 pl-3 border-l border-gray-100 flex flex-col mt-0.5 space-y-0.5">
                    {items.map((item) => {
                      const isItemActive = currentArea === item || currentType === item;
                      return (
                        <Link
                          key={item}
                          href={`/courses?area=${encodeURIComponent(item)}`}
                          className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isItemActive
                              ? "text-[#4f46e5] bg-[#eef2ff]/50 font-bold"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      {/* Bottom Option */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-all"
        >
          <Home size={16} className="text-gray-500" />
          <span>메인 홈페이지</span>
        </Link>
      </div>
    </aside>
  );
}
