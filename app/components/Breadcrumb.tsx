"use client";

import React, { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function BreadcrumbContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 경로 매핑
  const getBreadcrumbs = () => {
    const crumbs = [{ label: '홈', href: '/' }];
    
    if (!pathname) return crumbs;

    const paths = pathname.split('/').filter(Boolean);
    
    if (paths[0] === 'dashboard') {
      crumbs.push({ label: '전체 대시보드', href: '/dashboard' });
    } else if (paths[0] === 'courses') {
      crumbs.push({ label: '교과목 조회', href: '/courses' });
      const dept = searchParams.get('department');
      const area = searchParams.get('area');
      const type = searchParams.get('type');
      const college = searchParams.get('college');
      if (dept) {
        crumbs.push({ label: dept, href: `/courses?department=${encodeURIComponent(dept)}` });
      } else if (area) {
        crumbs.push({ label: area, href: `/courses?area=${encodeURIComponent(area)}` });
      } else if (type) {
        crumbs.push({ label: type, href: `/courses?type=${encodeURIComponent(type)}` });
      } else if (college) {
        crumbs.push({ label: college, href: `/courses?college=${encodeURIComponent(college)}` });
      }
    } else if (paths[0] === 'cart') {
      crumbs.push({ label: '수강바구니', href: '/cart' });
    } else if (paths[0] === 'orders') {
      crumbs.push({ label: '신청 내역', href: '/orders' });
    } else if (paths[0] === 'payment') {
      crumbs.push({ label: '결제', href: '/payment' });
      if (paths[1] === 'success') {
        crumbs.push({ label: '결제 완료', href: '/payment/success' });
      } else if (paths[1] === 'fail') {
        crumbs.push({ label: '결제 실패', href: '/payment/fail' });
      }
    } else if (paths[0] === 'auth') {
      crumbs.push({ label: '인증', href: '/auth' });
    }

    return crumbs;
  };

  const crumbs = getBreadcrumbs();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-sm text-gray-400 gap-4">
      {/* 실제 브레드크럼 경로 */}
      <nav className="flex items-center space-x-2">
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.href + idx}>
            {idx > 0 && <span className="text-gray-600">/</span>}
            {idx === crumbs.length - 1 ? (
              <span className="text-gray-200 font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-gray-200 transition-colors">
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
      
      {/* 우측 링크와 정사빈 이름 */}
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-200 border-r border-gray-700 pr-4">정사빈</span>
        <a href="https://www.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
          인천대학교 홈페이지
        </a>
        <a href="https://portal.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
          INU 포털
        </a>
        <a href="https://cyber.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
          이러닝
        </a>
      </div>
    </div>
  );
}

export default function Breadcrumb() {
  return (
    <Suspense fallback={
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-sm text-gray-400 gap-4">
        <nav className="flex items-center space-x-2">
          <span className="text-gray-200 font-medium">홈</span>
        </nav>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-200 border-r border-gray-700 pr-4">정사빈</span>
          <a href="https://www.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
            인천대학교 홈페이지
          </a>
          <a href="https://portal.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
            INU 포털
          </a>
          <a href="https://cyber.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
            이러닝
          </a>
        </div>
      </div>
    }>
      <BreadcrumbContent />
    </Suspense>
  );
}

