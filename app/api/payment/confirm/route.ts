import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    let secretKey = process.env.TOSS_SECRET_KEY;
    // 잘못된 예전 위젯용 시크릿 키가 감지되거나 누락된 경우 올바른 API 개별 연동용 테스트 시크릿 키로 치환합니다.
    if (!secretKey || secretKey === "test_sk_z5aZkW6mGb7qOp1Q15zb3z5G5ExO") {
      secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
    }

    // Toss Payments API requires Basic authorization with Base64 encoded secret key + ":"
    const authHeader = `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`;

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "결제 승인 요청이 실패했습니다.", code: data.code },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Payment confirmation error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
