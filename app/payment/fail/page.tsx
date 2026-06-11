"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { XCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react";

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "UNKNOWN_ERROR";
  const message = searchParams.get("message") || "결제 진행 중 오류가 발생했습니다.";
  const orderId = searchParams.get("orderId") || "-";

  return (
    <div className="max-w-md mx-auto bg-white/60 border border-white/50 backdrop-blur-md shadow-lg rounded-3xl p-8 text-center space-y-6 mt-12 animate-fade-in">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto bg-red-50 border border-red-100 rounded-3xl flex items-center justify-center text-red-500 shadow-sm animate-pulse">
        <XCircle size={36} />
      </div>

      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-red-500 tracking-wider uppercase">Payment Failed</span>
        <h1 className="text-2xl font-black text-[#111] tracking-tight">결제에 실패하였습니다</h1>
        <p className="text-xs text-gray-500 font-medium">
          결제 도중 오류가 발생했습니다. 아래 내용을 확인해 주세요.
        </p>
      </div>

      {/* Error Details */}
      <div className="bg-red-50/40 border border-red-100/50 rounded-2xl p-4 text-left space-y-2.5">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Error Message</p>
            <p className="text-xs text-[#111] font-semibold leading-relaxed mt-0.5">{message}</p>
          </div>
        </div>
        <div className="border-t border-red-100/30 pt-2.5 flex justify-between items-center text-xs">
          <span className="text-gray-400 font-semibold">에러 코드</span>
          <code className="px-1.5 py-0.5 bg-red-100/50 text-red-700 font-mono rounded text-[10px] font-bold">
            {code}
          </code>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400 font-semibold">주문번호</span>
          <span className="font-mono text-gray-500 text-[10px]" title={orderId}>
            {orderId.substring(0, 12)}...
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col gap-2.5">
        <Link
          href="/cart"
          className="w-full py-4 bg-[#111] hover:bg-[#333] text-white text-xs font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          장바구니로 돌아가서 다시 시도
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/"
          className="w-full py-4 bg-white/70 hover:bg-white/90 border border-white/50 hover:border-[#111]/30 text-[#111] text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center cursor-pointer text-center"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-red-500" />
        <h2 className="text-xl font-bold text-[#111]">오류 정보를 확인하는 중...</h2>
      </div>
    }>
      <PaymentFailContent />
    </Suspense>
  );
}
