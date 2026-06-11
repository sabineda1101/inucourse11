// app/components/AIAnalysisModal.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, X, FileText } from "lucide-react";

export default function AIAnalysisModal() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  return (
    <>
      {/* AI Analysis Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none transition-all active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 rounded-full animate-pulse group-hover:scale-105 transition-transform" />
        <div className="relative flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-xs font-bold text-indigo-700 transition-all hover:bg-opacity-95">
          <Sparkles size={13} className="text-purple-600 animate-spin" style={{ animationDuration: "4s" }} />
          <span>AI 강의 분석</span>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative animate-scaleUp">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600 animate-pulse" />
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">AI 강의 데이터 분석 리포트</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
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
                  <p><strong>전공강좌의 큰 비중:</strong> 전체 개설 강좌 중 <strong>전공심화</strong> 과목이 1,024개로 가장 높은 비중을 차지해 학생들이 전공 학습에 집중할 수 있는 환경이 조성되어 있습니다.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <p><strong>높은 수강 인기도:</strong> 교양 교육과정 중 <strong>심화교양</strong> 과목의 강좌당 평균 수강인원이 <strong>88명</strong>으로 가장 높아, 다양한 분야의 교양적 깊이를 추구하는 요구가 두드러집니다.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                  <p><strong>대면 중심 교육과정:</strong> 전체 강좌의 <strong>92.0%</strong>가 완전 대면 수업으로 개설되었으며, 혼합형 및 비대면 온라인 강의가 나머지 8.0%를 채우고 있습니다.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                  <p><strong>요일 편중 해소 필요:</strong> 개설 요일이 화요일(720개)과 수요일(710개)에 강하게 수렴되고 있으며, 주말에 가까울수록 강좌가 크게 감소하여 효율적인 강의실 자원 분배 정책이 권장됩니다.</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                리포트 닫기
              </button>
              <button
                onClick={() => {
                  const department = searchParams?.get('department') ?? '전체';
                  const today = new Date().toLocaleDateString('ko-KR');
                  let rawReport = `=== AI 강의 데이터 분석 보고서 ===\n분석 대상: 전체\n일자: 2026년 6월 8일\n작성 모델: Gemini 3.1 Flash-Lite\n\n# [분석 보고서] 2026학년도 1학기 인천대학교 교육과정 및 강좌 운영 분석\n\n**작성일:** 2026년 6월 8일\n**분석 대상:** 인천대학교 2026학년도 1학기 전체 강좌 및 수강 데이터\n\n---\n\n## 1. 데이터 요약\n본 보고서는 2026학년도 1학기 인천대학교의 교육과정 운영 현황을 데이터 기반으로 분석하였습니다. 전체적인 강좌 운영 지표는 다음과 같습니다.\n\n*   **강좌 규모:** 총 2,313개의 강좌가 개설되어 운영 중입니다.\n*   **수강 규모:** 총 74,273명의 학생들이 수강하고 있으며, **평균 수강율은 86.8%**로 안정적인 수요를 기록하고 있습니다.\n*   **글로벌 역량:** 전체 강좌 중 원어(영어) 강의 비율은 **10.3%**로, 국제화 교육 환경을 지속적으로 조성하고 있습니다.\n\n---\n\n## 2. 주요 특징 및 트렌드 분석\n\n### 1) 이수구분 및 학점 구성 특성\n*   **이수구분별 불균형:** '전공심화' 강좌가 1,014개(전체 대비 약 44%)로 가장 높은 비중을 차지하고 있습니다. 눈여겨볼 점은 **'심화교양'의 평균 수강인원이 82.5명**으로 타 이수구분 대비 압도적으로 높다는 점입니다. 이는 대형 강의 위주의 교양 교육이 이루어지고 있음을 시사합니다.\n*   **학점 구성:** 3학점 강좌가 **64.1%**로 절대다수를 차지하며 표준적인 학점 구성 체계를 따르고 있습니다. 1~2학점 강좌의 합계 비중도 약 34%로 나타나, 실습이나 세미나 등 다양한 형태의 학점 운영이 병행되고 있습니다.\n\n### 2) 수업방법 비중 및 시사점\n*   **대면수업 중심주의:** 전체 강좌의 **92.0%가 대면수업**으로 운영되고 있습니다. 이는 대학 교육의 본질인 상호작용과 공동체 의식 함양에 집중하려는 학교 측의 의지로 해석됩니다. 반면, 하이브리드 수업은 5% 내외로 활용도가 낮아, 미래형 디지털 학습 환경 도입에 대한 고민이 필요한 시점입니다.\n\n### 3) 요일 및 시간대별 강좌 배치 현황\n*   **요일 쏠림 현상:** 화요일(739개), 수요일(723개)에 강좌가 집중되어 있으며, 금요일(354개)은 월/화/수/목 대비 약 절반 수준으로 강좌 수가 급감합니다. 이는 '금공강(금요일 공강)' 선호 현상과 맞물려 요일별 캠퍼스 이용 밀도 격차를 발생시키고 있습니다.\n*   **시간대 쏠림 현상:** 오전 9시부터 오후 6시까지의 데이터를 분석한 결과, 15-18시에 강좌 수가 3,500개로 가장 많습니다. 오전 시간대 대비 오후 시간대 후반에 수업이 집중되는 경향은 학생들의 수강 패턴 및 학습 피로도와 관련이 있을 것으로 분석됩니다.\n\n---\n\n## 3. 문제점 및 개선 아이디어 제언\n\n### [수강율 극대화 및 효율적 운영]\n*   **심화교양 강좌 분반 검토:** 심화교양의 평균 수강인원이 82.5명으로 매우 높습니다. 학습 품질 보장을 위해 대형 강좌를 적정 규모로 분반하거나, 온·오프라인 혼합형(Blended Learning)을 도입하여 물리적 공간 제약을 완화할 것을 제언합니다.\n\n### [원어 강의 활성화]\n*   **원어 강의 인센티브 설계:** 현재 10.3% 수준의 원어 강의 비율을 단계적으로 상향하기 위해, 전공 핵심 및 심화 과정 내에서의 원어 강의 개설 시 교원 인센티브 부여 및 학생 대상 수강 우선권 제공 등의 정책적 지원이 필요합니다.\n\n### [요일/시간대 분산 전략]\n*   **금요일 교육 프로그램 활성화:** 금요일에만 운영되는 '특화 역량 강화 프로그램(비교과 프로그램, 집중 이수제)'을 도입하여 캠퍼스 이용의 효율성을 높이고 학생들의 학습권을 균등하게 보장해야 합니다.\n*   **학기 시간표 최적화:** 15-18시 쏠림 현상은 학생들의 오후 시간 학습 부담을 가중시킵니다. 데이터 기반 시간표 최적화 시스템을 도입하여 특정 시간대에 강좌가 과밀하게 배치되지 않도록 학과 간 교차 점검이 필요합니다.\n\n---\n\n*본 보고서는 2026학년도 1학기 학사 운영의 효율성을 제고하고, 학생 중심의 최적화된 교육 환경을 마련하기 위한 기초 자료로 활용되길 바랍니다.*\n`;
                  const report = rawReport
                    .replace('분석 대상: 전체', `분석 대상: ${department}`)
                    .replace('일자: 2026년 6월 8일', `일자: ${today}`)
                    .replace('**작성일:** 2026년 6월 8일', `**작성일:** ${today}`)
                    .replace('**분석 대상:** 인천대학교 2026학년도 1학기 전체 강좌 및 수강 데이터', `**분석 대상:** 인천대학교 ${department} 전체 강좌 및 수강 데이터`);
                  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "AI_강의_분석_보고서.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                보고서 다운로드
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
