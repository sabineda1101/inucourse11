"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { useCart, Course } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import { getSupabase } from "../../utils/supabase";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, Calendar, BookOpen, User, CreditCard, ChevronRight } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const { cart, clearCart } = useCart();
  const { orders: mockOrders, addOrder } = useOrder();
  const { user, isSupabase } = useAuth();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const confirmCalled = useRef(false);

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setErrorMessage("결제 정보가 올바르지 않습니다. 필수 파라미터가 누락되었습니다.");
      return;
    }

    if (confirmCalled.current) return;
    confirmCalled.current = true;

    const confirmPayment = async () => {
      try {
        // First check if the order has already been completed in database or mock orders
        const isMockOrderId = orderId.startsWith("mock_");
        
        if (isSupabase && !isMockOrderId) {
          const supabase = getSupabase();
          if (supabase) {
            const { data: existingOrder } = await supabase
              .from("orders")
              .select("*, order_items(*)")
              .eq("id", orderId)
              .single();
 
            if (existingOrder && existingOrder.status === "completed") {
              const mappedCourses: Course[] = existingOrder.order_items.map((item: any) => ({
                id: item.course_id,
                name: item.course_name,
                professor: item.professor,
                schedule: item.schedule,
                credits: item.credits,
                capacity: item.capacity,
                grading: item.grading,
                price: item.price,
              }));
              setPurchasedCourses(mappedCourses);
              setPaymentDetails({
                method: "카드",
                totalAmount: Number(amount),
                approvedAt: existingOrder.created_at,
              });
              setStatus("success");
              return;
            }
          }
        } else {
          const existingMockOrder = mockOrders.find((o) => o.id === orderId);
          if (existingMockOrder) {
            setPurchasedCourses(existingMockOrder.items);
            setPaymentDetails({
              method: "카드",
              totalAmount: Number(amount),
              approvedAt: existingMockOrder.orderDate,
            });
            setStatus("success");
            return;
          }
        }
 
        // Proceed to confirm payment via backend route handler
        const res = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });
 
        const confirmData = await res.json();
 
        if (!res.ok) {
          throw new Error(confirmData.message || "결제 승인 요청 중 에러가 발생했습니다.");
        }
 
        setPaymentDetails(confirmData);
 
        // Store course items for display before clearing the cart
        let coursesToDisplay: Course[] = [...cart];
 
        if (isSupabase && !isMockOrderId) {
          const supabase = getSupabase();
          if (supabase) {
            // Update order status to completed
            const { error: updateError } = await supabase
              .from("orders")
              .update({ status: "completed" })
              .eq("id", orderId);
 
            if (updateError) {
              console.error("Supabase order update failed:", updateError);
            }
 
            // Retrieve order items to ensure they are listed correctly
            const { data: itemsData } = await supabase
              .from("order_items")
              .select("*")
              .eq("order_id", orderId);
 
            if (itemsData && itemsData.length > 0) {
              coursesToDisplay = itemsData.map((item: any) => ({
                id: item.course_id,
                name: item.course_name,
                professor: item.professor,
                schedule: item.schedule,
                credits: item.credits,
                capacity: item.capacity,
                grading: item.grading,
                price: item.price,
              }));
            }
          }
        } else {
          // Mock mode: add order and clear cart
          addOrder(cart);
        }
 
        setPurchasedCourses(coursesToDisplay);
        clearCart();
        setStatus("success");
      } catch (err: any) {
        console.error("Confirmation flow error:", err);
        setStatus("error");
        setErrorMessage(err.message || "결제 승인 처리 중 예기치 않은 오류가 발생했습니다.");
      }
    };

    confirmPayment();
  }, [paymentKey, orderId, amount, isSupabase, cart, mockOrders, addOrder, clearCart]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-blue-600" />
        <h2 className="text-xl font-bold text-[#111]">결제 승인 중...</h2>
        <p className="text-xs text-gray-500 font-medium">안전하게 결제 승인을 진행하고 있습니다. 잠시만 기다려 주세요.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-md mx-auto bg-white/60 border border-white/50 backdrop-blur-md shadow-lg rounded-3xl p-8 text-center space-y-6 mt-12">
        <div className="w-16 h-16 mx-auto bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
          <XCircle size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#111]">결제 승인 실패</h2>
          <p className="text-xs text-red-600 font-semibold bg-red-50/50 py-2.5 px-4 rounded-xl border border-red-100/50 leading-relaxed">
            {errorMessage}
          </p>
        </div>
        <div className="pt-2 flex gap-3">
          <Link
            href="/cart"
            className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-[#333] text-xs font-bold rounded-xl transition-all shadow-sm text-center"
          >
            장바구니로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto bg-green-50 border border-green-100 rounded-3xl flex items-center justify-center text-green-500 shadow-sm animate-bounce">
          <CheckCircle2 size={36} />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Payment Approved</span>
          <h1 className="text-3xl font-black text-[#111] tracking-tight">수강 신청 및 결제 완료</h1>
          <p className="text-xs text-gray-500 font-medium">
            교과목 수강 신청과 수강료 결제가 성공적으로 완료되었습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course list - Left 2 Columns */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white/60 border border-white/50 backdrop-blur-md shadow-sm rounded-3xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#111] border-b border-gray-100 pb-3">신청 과목 정보</h2>
            <div className="divide-y divide-gray-50">
              {purchasedCourses.map((course) => (
                <div key={course.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-md text-[10px] font-extrabold">
                      {course.credits}학점
                    </span>
                    <h3 className="text-sm font-bold text-[#111]">{course.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#666] font-medium">
                    <span className="flex items-center gap-1">
                      <User size={11} className="text-gray-400" />
                      {course.professor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-gray-400" />
                      {course.schedule}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} className="text-gray-400" />
                      {course.grading}
                    </span>
                  </div>
                </div>
              ))}
              {purchasedCourses.length === 0 && (
                <p className="text-xs text-gray-400 py-4 text-center">신청 과목 정보를 불러올 수 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* Receipt & Actions - Right 1 Column */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white/80 border border-white/60 backdrop-blur-md shadow-md rounded-3xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#111] border-b border-gray-100 pb-3">결제 영수증</h2>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">주문번호</span>
                <span className="font-semibold text-[#111] truncate max-w-[120px]" title={orderId || ""}>
                  {orderId?.substring(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">결제수단</span>
                <span className="font-semibold text-[#111] flex items-center gap-1">
                  <CreditCard size={12} className="text-gray-400" />
                  {paymentDetails?.method || "신용카드"}
                </span>
              </div>
              {paymentDetails?.card && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">카드사</span>
                    <span className="font-semibold text-[#111]">{paymentDetails.card.company || "카드결제"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">할부구분</span>
                    <span className="font-semibold text-[#111]">
                      {paymentDetails.card.installmentPlanWeeks === 0 ? "일시불" : `${paymentDetails.card.installmentPlanWeeks}개월`}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">승인시각</span>
                <span className="font-semibold text-[#111]">
                  {paymentDetails?.approvedAt ? new Date(paymentDetails.approvedAt).toLocaleDateString("ko-KR", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                  }) : "-"}
                </span>
              </div>
              <div className="border-t border-black/[0.06] pt-3.5 flex justify-between items-end">
                <span className="font-bold text-[#111]">총 결제 금액</span>
                <span className="text-lg font-black text-blue-600 tracking-tight">
                  {(Number(amount)).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/orders"
              className="w-full py-4 bg-[#111] hover:bg-[#333] text-white text-xs font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              주문내역 조회하기
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/"
              className="w-full py-4 bg-white/70 hover:bg-white/90 border border-white/50 hover:border-[#111]/30 text-[#111] text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center cursor-pointer text-center"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-blue-600" />
        <h2 className="text-xl font-bold text-[#111]">결제 승인 중...</h2>
        <p className="text-xs text-gray-500 font-medium">결제 정보를 불러오고 있습니다.</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
