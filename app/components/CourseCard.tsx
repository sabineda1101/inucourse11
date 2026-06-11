"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Info, X, Check, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Mock Data Generator
// Mock Data Generator
export const generateMockCourses = (
  count: number,
  filters?: { college?: string | null; department?: string | null }
) => {
  const defaultNames = [
    "컴퓨터프로그래밍", "미적분학", "일반물리학", "선형대수학", 
    "대학영어", "사고와표현", "심리학의이해", "서양미술사",
    "공학윤리", "인공지능의이해", "데이터베이스", "운영체제"
  ];

  const college = filters?.college || null;
  const department = filters?.department || null;

  // Dynamically determine names based on selected department or college
  let names = defaultNames;
  
  if (department === "컴퓨터공학부" || college === "정보기술대학") {
    names = ["컴퓨터프로그래밍", "자료구조론", "알고리즘설계", "인공지능의이해", "데이터베이스", "운영체제론", "웹프로그래밍", "소프트웨어공학"];
  } else if (department === "국어국문학과" || department === "영어영문학과" || college === "인문대학") {
    names = ["한국문학의이해", "고전과삶", "대학영어", "영어실무회화", "세계문학기행", "언어학개론", "사고와표현", "비즈니스영어"];
  } else if (department === "사회복지학과" || college === "사회과학대학") {
    names = ["사회학개론", "미디어와사회", "사회복지실천론", "심리학의이해", "대중문화와미디어", "현대사회문제론"];
  } else if (college === "글로벌정경대학") {
    names = ["행정학원론", "정치학개론", "미시경제학", "거시경제학", "국제통상론", "무역학개론"];
  } else if (college === "공과대학") {
    names = ["공학윤리", "기초회로이론", "공학열역학", "전자기학입문", "공학수학", "신소재개론", "기계공작법"];
  } else if (college === "경영대학") {
    names = ["경영학원론", "마케팅관리", "재무회계기초", "세법개론", "조직행동론", "원가관리회계"];
  } else if (college === "예술체육대학") {
    names = ["서양미술사", "기초디자인", "공연예술기획", "체육사론", "운동생리학", "현대미술의이해"];
  } else if (college === "사범대학") {
    names = ["교육학개론", "교육심리학", "교양교육론", "교과교재연구", "역사교육론", "유아교육방법"];
  } else if (college === "도시과학대학") {
    names = ["도시계획원론", "도시행정학", "건축공학개론", "친환경도시건설", "도시공학설계"];
  } else if (college === "생명과학기술대학") {
    names = ["일반생물학", "분자생물학", "유전학개론", "생명공학원론", "생화학개론"];
  } else if (college === "융합자유전공대학") {
    names = ["창의적문제해결", "진로설계세미나", "융합인문학기초"];
  } else if (college === "동북아국제통상물류학부") {
    names = ["동북아경제론", "글로벌국제물류론", "스마트물류시스템", "중국경제의이해"];
  } else if (college === "법학부") {
    names = ["법학개론", "헌법의이해", "민법총칙", "형법총론", "상법기초"];
  } else if (college === "기초교육원") {
    names = ["글쓰기기초", "대학수학연습", "영어독해개론", "기초과학이해"];
  }

  const professors = ["김정경", "전병준", "채숙희", "하신영", "정우경", "박인우", "이인우"];
  const schedules = ["월1,2,3", "화4,5,6", "수7,8", "목1,2,3", "금4,5", "화5B-6,수5B-6", "화8B-9,수8B-9"];
  const gradings = ["상대평가", "절대평가", "P/F"];

  return Array.from({ length: count }).map((_, i) => {
    const credits = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selectedName = names[i % names.length];
    
    // Assign reasonable college/department properties if they are not explicitly specified
    let courseCollege = college || "교양교육원";
    let courseDept = department || "공통교양";
    
    return {
      id: Math.random().toString(36).substring(7),
      name: selectedName,
      professor: professors[Math.floor(Math.random() * professors.length)],
      schedule: schedules[Math.floor(Math.random() * schedules.length)],
      credits,
      capacity: Math.floor(Math.random() * 30) + 30, // 30 to 59
      grading: gradings[Math.floor(Math.random() * gradings.length)],
      price: credits * 50000,
      college: courseCollege,
      department: courseDept
    };
  });
};

export const CourseCard = ({ course }: { course: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { user } = useAuth();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const added = isInCart(course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      setToastMessage("로그인 후 이용 가능합니다");
      return;
    }

    if (added) {
      removeFromCart(course.id);
      setToastMessage("장바구니에서 제거되었습니다");
    } else {
      const success = addToCart({
        id: course.id,
        name: course.name,
        professor: course.professor,
        schedule: course.schedule,
        credits: course.credits,
        capacity: course.capacity,
        grading: course.grading,
        price: course.price,
      });
      if (success) {
        setToastMessage("장바구니에 담겼습니다");
      }
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#111]/90 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce border border-white/10 backdrop-blur-md z-[99999]">
          <div className={`w-2 h-2 rounded-full ${!user || toastMessage.includes("제거") || toastMessage.includes("로그인") ? "bg-amber-400 animate-pulse" : "bg-green-400 animate-pulse"}`} />
          {toastMessage}
        </div>
      )}

      <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition-all duration-300 ease-out hover:-translate-y-3 hover:bg-white/80 hover:border-[#111]/30 hover:z-10 flex flex-col relative group cursor-pointer">
        {/* Top Right "자세히" Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
          className="absolute top-4 right-4 text-xs font-semibold text-[#666] hover:text-[#111] bg-white/80 border border-white/60 px-3 py-1.5 rounded-lg transition-colors z-10 flex items-center gap-1 shadow-sm backdrop-blur-sm opacity-0 group-hover:opacity-100"
        >
          <Info size={14} />
          자세히
        </button>

        <div className="p-6 pb-4">
          {/* Title Area */}
          <h3 className="text-[#666] text-sm font-medium mb-1">교과목명</h3>
          <div className="text-3xl font-bold text-[#111] mb-3 tracking-tight w-4/5 truncate">
            {course.name}
          </div>
          
          {/* Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/70 border border-white/50 backdrop-blur-sm shadow-sm rounded-md text-xs font-semibold text-[#111] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {course.credits}학점
          </div>

          {/* Inner Gray Box */}
          <div className="bg-white/50 rounded-xl p-4 space-y-3 shadow-sm border border-white/40 backdrop-blur-sm">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#666]">담당교수</span>
              <span className="font-semibold text-[#111]">{course.professor}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#666]">시간표</span>
              <span className="font-semibold text-[#111]">{course.schedule}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#666]">정원 / 성적</span>
              <span className="font-semibold text-[#111]">{course.capacity}명 / {course.grading}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-[#e5e5e5] pt-3 mt-1">
              <span className="text-[#666] font-medium">수강가격</span>
              <span className="font-bold text-[#111] text-base">{course.price.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-auto p-4 pt-0">
          <button 
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 border cursor-pointer group/cartbtn ${
              added 
                ? "bg-blue-600 hover:bg-red-500 text-white border-transparent" 
                : "bg-[#111]/90 hover:bg-[#111] text-white border-transparent"
            }`}
          >
            {added ? (
              <>
                <Check size={16} className="group-hover/cartbtn:hidden" />
                <X size={16} className="hidden group-hover/cartbtn:block" />
                <span className="group-hover/cartbtn:hidden">✓ 담기 완료</span>
                <span className="hidden group-hover/cartbtn:block">담기 취소</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>장바구니 담기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-8 max-w-lg w-full shadow-2xl transform scale-100 transition-transform duration-300 relative" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-3 border border-blue-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {course.credits}학점
                </span>
                <h2 className="text-2xl font-bold text-[#111] tracking-tight">{course.name}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-[#666]" />
              </button>
            </div>
            
            {/* Body */}
            <div className="space-y-4 bg-white/50 rounded-2xl p-5 border border-white/60 shadow-sm">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">담당교수</span>
                <span className="font-semibold text-[#111]">{course.professor}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">시간표</span>
                <span className="font-semibold text-[#111]">{course.schedule}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">정원</span>
                <span className="font-semibold text-[#111]">{course.capacity}명</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">성적평가</span>
                <span className="font-semibold text-[#111]">{course.grading}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">수강가격</span>
                <span className="font-bold text-blue-600 text-lg">{course.price.toLocaleString()}원</span>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-semibold text-[#111] mb-2">교과목 소개</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  이 교과목은 <strong>{course.name}</strong>에 대한 전반적인 이해를 돕고, 실무에 적용할 수 있는 핵심 역량을 기르는 것을 목표로 합니다. 최신 트렌드를 반영한 커리큘럼으로 전문성을 높일 수 있습니다.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex gap-3">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl text-sm font-semibold transition-colors flex justify-center items-center gap-2 shadow-md cursor-pointer group/modalbtn ${
                  added 
                    ? "bg-blue-600 hover:bg-red-500 text-white" 
                    : "bg-[#111] hover:bg-[#333] text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} className="group-hover/modalbtn:hidden" />
                    <X size={18} className="hidden group-hover/modalbtn:block" />
                    <span className="group-hover/modalbtn:hidden">✓ 담기 완료</span>
                    <span className="hidden group-hover/modalbtn:block">담기 취소</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>장바구니 담기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const CourseCardSkeleton = () => {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden shadow-sm flex flex-col relative h-[360px]">
      <div className="p-6 pb-4">
        {/* Title Area Skeleton */}
        <div className="w-16 h-4 rounded-md animate-shimmer mb-2" />
        <div className="w-3/4 h-8 rounded-lg animate-shimmer mb-4" />
        <div className="w-16 h-6 rounded-md animate-shimmer mb-6" />

        {/* Inner Gray Box Skeleton */}
        <div className="bg-white/50 rounded-xl p-4 space-y-4 border border-white/40 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="w-16 h-4 rounded animate-shimmer" />
            <div className="w-20 h-4 rounded animate-shimmer" />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-12 h-4 rounded animate-shimmer" />
            <div className="w-24 h-4 rounded animate-shimmer" />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-20 h-4 rounded animate-shimmer" />
            <div className="w-24 h-4 rounded animate-shimmer" />
          </div>
          <div className="flex justify-between items-center border-t border-[#e5e5e5] pt-3 mt-1">
            <div className="w-16 h-4 rounded animate-shimmer" />
            <div className="w-24 h-5 rounded animate-shimmer" />
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 pt-0">
        <div className="w-full h-11 rounded-xl animate-shimmer" />
      </div>
    </div>
  );
};
