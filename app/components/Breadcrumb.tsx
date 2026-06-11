import React from 'react';

export default function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-4 text-sm text-gray-400">
      <span className="font-medium text-gray-200">정사빈</span>
      <a href="https://www.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:underline">
        인천대학교 홈페이지
      </a>
      <a href="https://portal.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:underline">
        INU 포털
      </a>
      <a href="https://cyber.inu.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:underline">
        이러닝
      </a>
    </nav>
  );
}
