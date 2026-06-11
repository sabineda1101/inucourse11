export const MENU_DATA = {
  "기초교양": [
    "학문의기초"
  ],
  "핵심교양": [
    "(핵심)INU세미나",
    "(핵심)과학기술",
    "(핵심)사회",
    "(핵심)예술체육",
    "(핵심)외국어",
    "(핵심)인문"
  ],
  "심화교양": [
    "과학기술",
    "사회",
    "예술체육",
    "외국어",
    "인문"
  ]
};

export type CourseCategory = keyof typeof MENU_DATA;

export interface CollegeInfo {
  name: string;
  href: string;
  isExternal?: boolean;
  departments: string[];
}

export const UNIVERSITY_DATA: CollegeInfo[] = [
  {
    name: "대학전체",
    href: "/courses",
    departments: []
  },
  {
    name: "기초교육원",
    href: "https://liberaledu.inu.ac.kr",
    isExternal: true,
    departments: ["교양"]
  },
  {
    name: "인문대학",
    href: "/courses?college=인문대학",
    departments: [
      "국어국문학과",
      "영어영문학과",
      "독어독문학과",
      "불어불문학과",
      "일본지역문화학과",
      "중어중국학과"
    ]
  },
  {
    name: "자연과학대학",
    href: "/courses?college=자연과학대학",
    departments: [
      "물리학과",
      "수학과",
      "패션산업학과",
      "해양학과",
      "화학과"
    ]
  },
  {
    name: "사회과학대학",
    href: "/courses?college=사회과학대학",
    departments: [
      "사회복지학과",
      "미디어커뮤니케이션학과",
      "문헌정보학과",
      "창의인재개발학과"
    ]
  },
  {
    name: "글로벌정경대학",
    href: "/courses?college=글로벌정경대학",
    departments: [
      "행정학과",
      "정치외교학과",
      "경제학과",
      "무역학부",
      "소비자학과"
    ]
  },
  {
    name: "공과대학",
    href: "/courses?college=공과대학",
    departments: [
      "기계공학과",
      "전기공학과",
      "전자공학과",
      "산업경영공학과",
      "신소재공학과",
      "안전공학과",
      "에너지화학공학과",
      "메카트로닉스공학과"
    ]
  },
  {
    name: "정보기술대학",
    href: "/courses?college=정보기술대학",
    departments: [
      "컴퓨터공학부",
      "정보통신공학과",
      "임베디드시스템공학과"
    ]
  },
  {
    name: "경영대학",
    href: "/courses?college=경영대학",
    departments: [
      "경영학부",
      "세무회계학과"
    ]
  },
  {
    name: "예술체육대학",
    href: "/courses?college=예술체육대학",
    departments: [
      "조형예술학부",
      "디자인학부",
      "공연예술학과",
      "체육학부",
      "운동건강학부"
    ]
  },
  {
    name: "사범대학",
    href: "/courses?college=사범대학",
    departments: [
      "국어교육과",
      "영어교육과",
      "일어교육과",
      "수학교육과",
      "체육교육과",
      "유아교육과",
      "역사교육과",
      "윤리교육과"
    ]
  },
  {
    name: "도시과학대학",
    href: "/courses?college=도시과학대학",
    departments: [
      "도시행정학과",
      "도시환경공학부",
      "도시공학과",
      "도시건축학부"
    ]
  },
  {
    name: "생명과학기술대학",
    href: "/courses?college=생명과학기술대학",
    departments: [
      "생명과학부",
      "생명공학부"
    ]
  },
  {
    name: "융합자유전공대학",
    href: "/courses?college=융합자유전공대학",
    departments: [
      "자유전공학부"
    ]
  },
  {
    name: "동북아국제통상물류학부",
    href: "/courses?college=동북아국제통상물류학부",
    departments: [
      "동북아국제통상전공",
      "스마트물류공학전공"
    ]
  },
  {
    name: "법학부",
    href: "/courses?college=법학부",
    departments: [
      "법학부"
    ]
  }
];
