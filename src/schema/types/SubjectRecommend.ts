export type SearchMode = "UNIV" | "FULL";

export type UnivKeyword = string;

export type MajorKeyword = string;

export type FullNameKeyword = string;

export type UnivSearchResult = {
  id: number;
  name: string;
};

export type MajorResult = {
  id: number | string;
  name: string;
  univ: string;
  department: string;
} & MajorRecruit;

export type MajorRecruit =  {
  requiredCredits: RequiredCreditFieldDto[];
  requiredGroups: string[];
  difficulty: string;
}

export type RequiredCreditFieldDto = {
  subjectCategory: string;
  amount: string;
}

export type SelectedMajorId = number | string | null;

export type SubjectData = {
  code: string; // 과목코드
  name: string; // 교과명
  subjectCategory: string; // 구분
  group: string; // 그룹명
  description: string; // 설명
  suneungInfo: string; // 수능과목정보
  etcInfo: string; // 기타정보
};

export type RecommendStatus = {
  status: number;
  // status: '양호' | '불안' | '위험';
  comparisons: Comparison[];
}

export type Comparison = {
  subjectName: string;
  score: number;
}
