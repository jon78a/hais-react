export type MajorId = string;

export type UnivKeyword = string;
export type MajorKeyword = string;

export type UnivChoice = {
  name: string;
  id: number;
};

export type MajorChoice = {
  name: string;
  id: number;
};

// 대학, 학과 검색
export type UnivToMajorInput = {
  univChoice: UnivChoice;
  majorChoice: MajorChoice;
}

export type GeneralMajorByClsfInput = {
  generalMajorChoice: string;
  clsfChoice: string | null;
  generalMajorNameChoices: string[];
}

export type MajorSearchResult = {
  majorId: MajorId;
  univName: string;
  majorName: string;
}

export type SearchFilter = {
  majorId: MajorId;
}

export type SearchSummary = {
  code: string;
  sbjName: string;  // 추천교과명
  category: string;  // 과목분류
  group: string;
  suneungOX: "O" | "X";
  // sbjArea: string;  // 국어, 수학, 과학
  // description: string;  // 상세 설명
}

export type SearchDetail = {
  // sbjName: string;
  description: string;
  etcInfo: string;
}
