export type SearchBase = {
  type: "Normal" | "Score";
}

export type MajorId = string;

export type MajorSearchResult = {
  majorId: MajorId;
  univName: string;
  majorName: string;
}

export type SearchFilter = {
  majorId: MajorId;
}

export type SearchSummaryData = {
  sbjArea: string;
  sbjName: string;
  description: string;
}

export type SearchDetailData = {
  sbjName: string;
  description: string;
  suneungInfo: string;
  etcInfo: string;
}
