"use client";

import { useState } from "react";
import { 
  Home as HomeIcon, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  X,
  FileText
} from "lucide-react";
import Link from "next/link";

// Donut Chart Segment Interface
interface DonutSegment {
  label: string;
  percentage: number;
  color: string;
}

// Interactive SVG Donut Chart Component
function SVGDonut({ segments, total, label }: { segments: DonutSegment[]; total: number; label: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const radius = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius; // Approx 314.159
  
  let accumulatedPercentage = 0;
  
  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 140 140" className="w-36 h-36 transform -rotate-90">
        {segments.map((segment, idx) => {
          const strokeLength = (segment.percentage / 100) * circumference;
          const strokeOffset = circumference - (accumulatedPercentage / 100) * circumference;
          accumulatedPercentage += segment.percentage;
          
          const isHovered = hoveredIdx === idx;
          
          return (
            <circle
              key={idx}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={isHovered ? strokeWidth + 2.5 : strokeWidth}
              strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-300 cursor-pointer origin-center"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          );
        })}
      </svg>
      
      {/* Center label displaying active values on hover */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
        {hoveredIdx !== null ? (
          <>
            <span className="text-[10px] font-bold text-gray-500 max-w-[90px] truncate leading-tight">
              {segments[hoveredIdx].label}
            </span>
            <span className="text-base font-extrabold text-indigo-600 leading-tight mt-0.5 animate-pulse">
              {segments[hoveredIdx].percentage}%
            </span>
          </>
        ) : (
          <>
            <span className="text-[9px] font-extrabold text-gray-400 tracking-wider leading-tight">{label}</span>
            <span className="text-base font-extrabold text-gray-800 leading-tight mt-0.5">{total.toLocaleString()}</span>
          </>
        )}
      </div>
    </div>
  );
}

// Static details for 상세 강좌 정보 table
const DETAILED_COURSES = [
  // Page 1
  { name: "RISE", type: "전공심화", credits: 3, professor: "김정경", schedule: "[15-119:원(야1-2A)(야2B-3)]", enrollment: 3, capacity: 3 },
  { name: "RISE", type: "전공심화", credits: 3, professor: "전병준", schedule: "[15-119:화(야1-2A)(야2B-3)]", enrollment: 2, capacity: 2 },
  { name: "RISE", type: "전공심화", credits: 3, professor: "채숙희", schedule: "[15-119:수(야1-2A)(야2B-3)]", enrollment: 3, capacity: 3 },
  { name: "자기설계세미나 I", type: "전공기초", credits: 1, professor: "전병준", schedule: "[15-119:목(3)]", enrollment: 12, capacity: 10 },
  { name: "자기설계세미나 I", type: "전공기초", credits: 1, professor: "김정경", schedule: "[15-503:목(3)]", enrollment: 13, capacity: 10 },
  { name: "자기설계세미나 I", type: "전공기초", credits: 1, professor: "하신영", schedule: "[15-405:목(3)]", enrollment: 10, capacity: 10 },
  { name: "고전과삶", type: "전공기초", credits: 3, professor: "김정경", schedule: "[15-119:화(5B-6),수(5B-6)]", enrollment: 24, capacity: 20 },
  { name: "고전과삶", type: "전공기초", credits: 3, professor: "김정경", schedule: "[15-119:화(8B-9),수(8B-9)]", enrollment: 20, capacity: 20 },
  { name: "한국문학의이해", type: "전공기초", credits: 3, professor: "정우경", schedule: "[15-119:원(1-2A)(2B-3)]", enrollment: 19, capacity: 19 },
  { name: "한국문학의이해", type: "전공기초", credits: 3, professor: "정우경", schedule: "[15-119:원(7-8A)(8B-9)]", enrollment: 23, capacity: 23 },
  
  // Page 2
  { name: "알고리즘설계", type: "전공핵심", credits: 3, professor: "이인우", schedule: "[15-302:월(1-3)]", enrollment: 45, capacity: 40 },
  { name: "데이터베이스", type: "전공핵심", credits: 3, professor: "박인우", schedule: "[15-303:화(4-6)]", enrollment: 38, capacity: 40 },
  { name: "운영체제론", type: "전공핵심", credits: 3, professor: "최인우", schedule: "[15-304:수(7-8)]", enrollment: 40, capacity: 40 },
  { name: "웹프로그래밍", type: "전공기초", credits: 3, professor: "정인우", schedule: "[15-305:목(1-3)]", enrollment: 30, capacity: 30 },
  { name: "소프트웨어공학", type: "전공심화", credits: 3, professor: "강인우", schedule: "[15-306:금(4-5)]", enrollment: 28, capacity: 30 },
  { name: "미적분학", type: "기초교양", credits: 3, professor: "김인우", schedule: "[15-101:월(4-6)]", enrollment: 55, capacity: 60 },
  { name: "일반물리학", type: "기초교양", credits: 3, professor: "이인우", schedule: "[15-102:화(1-3)]", enrollment: 58, capacity: 60 },
  { name: "선형대수학", type: "기초교양", credits: 3, professor: "박인우", schedule: "[15-103:수(4-5)]", enrollment: 42, capacity: 40 },
  { name: "대학영어", type: "기초교양", credits: 2, professor: "최인우", schedule: "[15-104:목(6-7)]", enrollment: 20, capacity: 20 },
  { name: "사고와표현", type: "기초교양", credits: 2, professor: "정인우", schedule: "[15-105:금(1-2)]", enrollment: 25, capacity: 25 },
  
  // Page 3
  { name: "사회학개론", type: "핵심교양", credits: 3, professor: "김정경", schedule: "[15-201:월(1-3)]", enrollment: 48, capacity: 50 },
  { name: "미디어와사회", type: "핵심교양", credits: 3, professor: "전병준", schedule: "[15-202:화(4-6)]", enrollment: 52, capacity: 50 },
  { name: "심리학의이해", type: "핵심교양", credits: 3, professor: "채숙희", schedule: "[15-203:수(7-8)]", enrollment: 80, capacity: 80 },
  { name: "서양미술사", type: "심화교양", credits: 3, professor: "하신영", schedule: "[15-204:목(1-3)]", enrollment: 35, capacity: 40 },
  { name: "공학윤리", type: "심화교양", credits: 2, professor: "정우경", schedule: "[15-205:금(4-5)]", enrollment: 30, capacity: 30 },
  { name: "행정학원론", type: "전공기초", credits: 3, professor: "박인우", schedule: "[15-401:월(7-9)]", enrollment: 45, capacity: 45 },
  { name: "정치학개론", type: "전공기초", credits: 3, professor: "이인우", schedule: "[15-402:화(1-3)]", enrollment: 40, capacity: 40 },
  { name: "회로이론", type: "전공핵심", credits: 3, professor: "김정경", schedule: "[15-403:수(4-6)]", enrollment: 48, capacity: 50 },
  { name: "마케팅관리", type: "전공핵심", credits: 3, professor: "전병준", schedule: "[15-404:목(7-8)]", enrollment: 62, capacity: 60 },
  { name: "교육학개론", type: "전공기초", credits: 3, professor: "채숙희", schedule: "[15-405:금(1-3)]", enrollment: 38, capacity: 40 }
];

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsPerPage = 10;
  const totalItems = 2313;
  const totalPages = 232;

  // Retrieve current items from list of 30 mock items
  const displayCourses = DETAILED_COURSES.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-8 font-sans">
      {/* Upper Navigation & Breadcrumb */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors flex items-center gap-1">
              <HomeIcon size={13} />
              <span>홈</span>
            </Link>
            <span>/</span>
            <span className="text-gray-500 font-bold">전체 대시보드</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-950 tracking-tight flex items-baseline gap-2">
            전체 교과목 대시보드
            <span className="text-xs font-medium text-gray-400">전체 | 2,313개 강좌</span>
          </h1>
        </div>

        {/* AI Analysis Button with custom gradients */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none transition-all active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 rounded-full animate-pulse group-hover:scale-105 transition-transform" />
          <div className="relative flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-xs font-bold text-indigo-700 transition-all hover:bg-opacity-95">
            <Sparkles size={13} className="text-purple-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI 강의 분석</span>
          </div>
        </button>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-white border border-gray-100/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">총 강좌 수</span>
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">2,313</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#eef2ff] group-hover:text-[#4f46e5] transition-all duration-300">
            <BookOpen size={20} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-gray-100/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">총 수강인원</span>
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">74,273</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#eef2ff] group-hover:text-[#4f46e5] transition-all duration-300">
            <Users size={20} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-gray-100/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">평균 수강률</span>
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">86.8%</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#eef2ff] group-hover:text-[#4f46e5] transition-all duration-300">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-gray-100/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">원어강의 비율</span>
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">10.3%</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#eef2ff] group-hover:text-[#4f46e5] transition-all duration-300">
            <Globe size={20} />
          </div>
        </div>
      </div>

      {/* Row 1: 이수구분별 강좌 수 & 평균 수강인원 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 (Interactive Bar Chart) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-900" />
            이수구분별 강좌 수
          </h2>
          <div className="flex-1 space-y-4">
            {[
              { label: "전공심화", val: 1024, max: 1024, isYellow: true },
              { label: "전공핵심", val: 480, max: 1024 },
              { label: "전공기초", val: 350, max: 1024 },
              { label: "기초교양", val: 260, max: 1024 },
              { label: "심화교양", val: 240, max: 1024 },
              { label: "핵심교양", val: 120, max: 1024 }
            ].map((bar) => {
              const widthPct = (bar.val / bar.max) * 100;
              return (
                <div key={bar.label} className="space-y-1.5 relative group/bar">
                  <div className="flex justify-between text-xs font-bold text-gray-600">
                    <span>{bar.label}</span>
                    <span>{bar.val.toLocaleString()}</span>
                  </div>
                  {/* Tooltip popping up on hover */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-950/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-all duration-200 transform scale-95 group-hover/bar:scale-100 z-30 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full ${bar.isYellow ? 'bg-amber-400 animate-pulse' : 'bg-indigo-400 animate-pulse'}`} />
                    <span>{bar.label}: <strong>{bar.val.toLocaleString()}개</strong> 강좌</span>
                  </div>
                  <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                    <div
                      className="h-full rounded-full transition-all duration-300 group-hover/bar:brightness-90"
                      style={{
                        width: `${widthPct}%`,
                        background: bar.isYellow
                          ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                          : "linear-gradient(90deg, #818cf8, #a5b4fc)"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* X-axis */}
          <div className="mt-4 pt-2 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-400 px-1">
            <span>0</span>
            <span>300</span>
            <span>600</span>
            <span>900</span>
            <span>1200</span>
          </div>
        </div>

        {/* Chart 2 (Interactive Bar Chart) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-900" />
            이수구분별 평균 수강인원
          </h2>
          <div className="flex-1 space-y-4">
            {[
              { label: "심화교양", val: 88, max: 88, isYellow: true },
              { label: "핵심교양", val: 58, max: 88 },
              { label: "기초교양", val: 42, max: 88 },
              { label: "전공핵심", val: 40, max: 88 },
              { label: "전공기초", val: 32, max: 88 },
              { label: "전공심화", val: 24, max: 88 }
            ].map((bar) => {
              const widthPct = (bar.val / bar.max) * 100;
              return (
                <div key={bar.label} className="space-y-1.5 relative group/bar">
                  <div className="flex justify-between text-xs font-bold text-gray-600">
                    <span>{bar.label}</span>
                    <span>{bar.val}</span>
                  </div>
                  {/* Tooltip popping up on hover */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-950/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-all duration-200 transform scale-95 group-hover/bar:scale-100 z-30 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full ${bar.isYellow ? 'bg-amber-400 animate-pulse' : 'bg-indigo-400 animate-pulse'}`} />
                    <span>{bar.label}: 평균 <strong>{bar.val}명</strong> 수강</span>
                  </div>
                  <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                    <div
                      className="h-full rounded-full transition-all duration-300 group-hover/bar:brightness-90"
                      style={{
                        width: `${widthPct}%`,
                        background: bar.isYellow
                          ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                          : "linear-gradient(90deg, #818cf8, #a5b4fc)"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* X-axis */}
          <div className="mt-4 pt-2 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-400 px-1">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* Row 2: 수업방법 유형 분포 & 학점 구성 비율 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Donut (SVG layout with hover interactions) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1 flex flex-col">
            <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-900" />
              수업방법 유형 분포
            </h2>
            <div className="flex justify-center md:justify-start items-center py-2">
              <SVGDonut 
                label="TOTAL"
                total={2313}
                segments={[
                  { label: "대면수업", percentage: 92.0, color: "#4f46e5" },
                  { label: "온라인(동영상)+오프라인(출석)학습", percentage: 5.0, color: "#10b981" },
                  { label: "온라인(동영상)", percentage: 2.2, color: "#f59e0b" },
                  { label: "온라인(화상)+오프라인(출석)학습", percentage: 0.3, color: "#3b82f6" },
                  { label: "온라인(동화상)+오프라인(출석)학습", percentage: 0.3, color: "#06b6d4" }
                ]}
              />
            </div>
          </div>

          <div className="w-full md:w-[320px] space-y-2 text-xs font-semibold text-gray-500">
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                <span>대면수업</span>
              </div>
              <span className="font-bold text-gray-700">92.0% (2,128개)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="truncate max-w-[200px]">온라인(동영상)+오프라인(혼합형)</span>
              </div>
              <span className="font-bold text-gray-700">5.0% (116개)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span>온라인(동영상)</span>
              </div>
              <span className="font-bold text-gray-700">2.2% (51개)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                <span>온라인(화상)+오프라인(혼합형)</span>
              </div>
              <span className="font-bold text-gray-700">0.3% (9개)</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
                <span className="truncate max-w-[200px]">온라인(동화상)+오프라인(혼합형)</span>
              </div>
              <span className="font-bold text-gray-700">0.3% (9개)</span>
            </div>
          </div>
        </div>

        {/* Chart 4: Donut (SVG layout with hover interactions) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1 flex flex-col">
            <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-900" />
              학점 구성 비율
            </h2>
            <div className="flex justify-center md:justify-start items-center py-2">
              <SVGDonut 
                label="COURSES"
                total={2313}
                segments={[
                  { label: "3학점", percentage: 64.1, color: "#4f46e5" },
                  { label: "1학점", percentage: 17.3, color: "#10b981" },
                  { label: "2학점", percentage: 16.8, color: "#f59e0b" },
                  { label: "4학점", percentage: 1.0, color: "#3b82f6" },
                  { label: "12학점", percentage: 0.7, color: "#06b6d4" }
                ]}
              />
            </div>
          </div>

          <div className="w-full md:w-[320px] space-y-2 text-xs font-semibold text-gray-500">
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                <span>3학점</span>
              </div>
              <span className="font-bold text-gray-700">64.1% (1,483개)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span>1학점</span>
              </div>
              <span className="font-bold text-gray-700">17.3% (400개)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span>2학점</span>
              </div>
              <span className="font-bold text-gray-700">16.8% (389개)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                <span>4학점</span>
              </div>
              <span className="font-bold text-gray-700">1.0% (23개)</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
                <span>12학점</span>
              </div>
              <span className="font-bold text-gray-700">0.7% (16개)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: 요일별 수업 강좌 수 & 수업 시간별 강좌 수 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 요일별 (Interactive Bar Chart) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-900" />
            요일별 수업 강좌 수
          </h2>
          <div className="flex-1 space-y-4">
            {[
              { label: "월", val: 630, max: 720 },
              { label: "화", val: 720, max: 720, isYellow: true },
              { label: "수", val: 710, max: 720 },
              { label: "목", val: 580, max: 720 },
              { label: "금", val: 320, max: 720 },
              { label: "토", val: 25, max: 720 }
            ].map((bar) => {
              const widthPct = (bar.val / bar.max) * 100;
              return (
                <div key={bar.label} className="space-y-1.5 relative group/bar">
                  <div className="flex justify-between text-xs font-bold text-gray-600">
                    <span>{bar.label}요일</span>
                    <span>{bar.val}</span>
                  </div>
                  {/* Tooltip popping up on hover */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-950/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-all duration-200 transform scale-95 group-hover/bar:scale-100 z-30 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full ${bar.isYellow ? 'bg-amber-400 animate-pulse' : 'bg-[#818cf8] animate-pulse'}`} />
                    <span>{bar.label}요일 개설 강좌: <strong>{bar.val}개</strong></span>
                  </div>
                  <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                    <div
                      className="h-full rounded-full transition-all duration-500 group-hover/bar:brightness-90"
                      style={{
                        width: `${widthPct}%`,
                        background: bar.isYellow
                          ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                          : "linear-gradient(90deg, #818cf8, #a5b4fc)"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-2 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-400 px-1">
            <span>0</span>
            <span>200</span>
            <span>400</span>
            <span>600</span>
            <span>800</span>
          </div>
        </div>

        {/* 시간별 (Interactive Bar Chart) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-900" />
            수업 시간별 강좌 수
          </h2>
          <div className="flex-1 space-y-4">
            {[
              { label: "오전 9-12시", val: 1800, max: 3500 },
              { label: "12-15시", val: 2700, max: 3500 },
              { label: "15-18시", val: 3500, max: 3500, isYellow: true }
            ].map((bar) => {
              const widthPct = (bar.val / bar.max) * 100;
              return (
                <div key={bar.label} className="space-y-1.5 relative group/bar">
                  <div className="flex justify-between text-xs font-bold text-gray-600">
                    <span>{bar.label}</span>
                    <span>{bar.val.toLocaleString()}</span>
                  </div>
                  {/* Tooltip popping up on hover */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-950/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-all duration-200 transform scale-95 group-hover/bar:scale-100 z-30 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full ${bar.isYellow ? 'bg-amber-400 animate-pulse' : 'bg-[#818cf8] animate-pulse'}`} />
                    <span>{bar.label}: <strong>{bar.val.toLocaleString()}개</strong> 강좌</span>
                  </div>
                  <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                    <div
                      className="h-full rounded-full transition-all duration-500 group-hover/bar:brightness-90"
                      style={{
                        width: `${widthPct}%`,
                        background: bar.isYellow
                          ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                          : "linear-gradient(90deg, #818cf8, #a5b4fc)"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-2 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-400 px-1">
            <span>0</span>
            <span>900</span>
            <span>1800</span>
            <span>2700</span>
            <span>3600</span>
          </div>
        </div>
      </div>

      {/* Row 4: 대학(원)별 강좌 분석 요약 Table */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gray-900" />
          대학(원)별 강좌 분석 요약
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-500">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400">
                <th className="py-3 px-4 w-16">순위</th>
                <th className="py-3 px-4">대학(원)</th>
                <th className="py-3 px-4 text-right">강좌 수</th>
                <th className="py-3 px-4 text-right">수강인원 합계</th>
                <th className="py-3 px-4 text-right">평균 수강률(%)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, name: "기초교육원", courses: 491, students: 27345, rate: "93.5%" },
                { rank: 2, name: "공과대학", courses: 317, students: 10763, rate: "88.0%" },
                { rank: 3, name: "예술체육대학", courses: 253, students: 4906, rate: "85.9%" },
                { rank: 4, name: "인문대학", courses: 179, students: 3185, rate: "92.9%" },
                { rank: 5, name: "도시과학대학", courses: 179, students: 4101, rate: "80.1%" },
                { rank: 6, name: "사범대학", courses: 139, students: 2008, rate: "76.9%" },
                { rank: 7, name: "자연과학대학", courses: 133, students: 3766, rate: "84.4%" },
                { rank: 8, name: "정보기술대학", courses: 126, students: 4419, rate: "82.8%" },
                { rank: 9, name: "글로벌정경대학", courses: 122, students: 4038, rate: "85.8%" },
                { rank: 10, name: "생명과학기술대학", courses: 116, students: 2937, rate: "89.0%" }
              ].map((row) => (
                <tr key={row.rank} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="w-5 h-5 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-[10px]">
                      {row.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-bold">{row.name}</td>
                  <td className="py-3 px-4 text-right text-gray-700 font-bold">{row.courses}개</td>
                  <td className="py-3 px-4 text-right text-gray-700 font-bold">{row.students.toLocaleString()}명</td>
                  <td className="py-3 px-4 text-right text-indigo-600 font-bold">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 5: 상세 강좌 정보 Table */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-900" />
            상세 강좌 정보
          </h2>
          <span className="text-[10px] font-bold text-gray-400">
            총 2,313개 중 {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalItems)}번째 표시
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-500">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400">
                <th className="py-3 px-4">교과목명</th>
                <th className="py-3 px-4">이수구분</th>
                <th className="py-3 px-4">학점</th>
                <th className="py-3 px-4">담당교수</th>
                <th className="py-3 px-4">시간표(교시)</th>
                <th className="py-3 px-4 text-right">수강 / 정원</th>
                <th className="py-3 px-4 text-right">수강율</th>
              </tr>
            </thead>
            <tbody>
              {displayCourses.map((course, idx) => {
                const rate = ((course.enrollment / course.capacity) * 100).toFixed(1);
                return (
                  <tr key={`${course.name}-${idx}`} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 text-gray-800 font-bold">{course.name}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        course.type.includes("심화") 
                          ? "bg-amber-50 text-amber-700 border border-amber-100" 
                          : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      }`}>
                        {course.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{course.credits}학점</td>
                    <td className="py-3.5 px-4 text-gray-700">{course.professor}</td>
                    <td className="py-3.5 px-4 text-gray-500 font-mono text-[10px]">{course.schedule}</td>
                    <td className="py-3.5 px-4 text-right text-gray-700 font-bold">{course.enrollment} / {course.capacity}</td>
                    <td className="py-3.5 px-4 text-right text-indigo-600 font-bold">{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Working Pagination */}
        <div className="flex items-center justify-center gap-1.5 mt-6 pt-4 border-t border-gray-50">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-800 disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm ${
                currentPage === page
                  ? "bg-gray-900 text-white border border-transparent"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <span className="text-gray-400 text-xs px-1">...</span>

          <button
            disabled={true}
            className="w-8 h-8 rounded-lg text-xs font-bold border border-gray-200 text-gray-400"
          >
            {totalPages}
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))} // limits paginations to 3 pages for preview
            disabled={currentPage === 3}
            className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-800 disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* AI Analysis Interactive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative animate-scaleUp">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600 animate-pulse" />
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">AI 강의 데이터 분석 리포트</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 bg-gray-50 hover:bg-gray-150 rounded-full transition-colors text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="space-y-5 text-sm leading-relaxed text-gray-600">
              <div className="bg-[#eef2ff] border border-[#e0e7ff] rounded-2xl p-4 flex gap-3">
                <FileText className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-bold text-indigo-900 text-xs mb-1">인천대학교 2026학년도 1학기 분석결과</h4>
                  <p className="text-indigo-950 text-xs">
                    총 2,313개 개설 강좌와 74,273명의 수강신청 이력을 바탕으로 정밀 생성된 AI 종합 리포트입니다.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                  <p>
                    <strong>전공강좌의 큰 비중:</strong> 전체 개설 강좌 중 <strong>전공심화</strong> 과목이 1,024개로 가장 높은 비중을 차지해 학생들이 전공 학습에 집중할 수 있는 환경이 조성되어 있습니다.
                  </p>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <p>
                    <strong>높은 수강 인기도:</strong> 교양 교육과정 중 <strong>심화교양</strong> 과목의 강좌당 평균 수강인원이 <strong>88명</strong>으로 가장 높아, 다양한 분야의 교양적 깊이를 추구하는 요구가 두드러집니다.
                  </p>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                  <p>
                    <strong>대면 중심 교육과정:</strong> 전체 강좌의 <strong>92.0%</strong>가 완전 대면 수업으로 개설되었으며, 혼합형 및 비대면 온라인 강의가 나머지 8.0%를 채우고 있습니다.
                  </p>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                  <p>
                    <strong>요일 편중 해소 필요:</strong> 개설 요일이 화요일(720개)과 수요일(710개)에 강하게 수렴되고 있으며, 주말에 가까울수록 강좌가 크게 감소하여 효율적인 강의실 자원 분배 정책이 권장됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                리포트 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
