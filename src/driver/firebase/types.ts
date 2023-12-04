import type { StudentCategoryCode } from "../../policy/school";

export type GeneralMajorType = {
  code: string;
  clsf_name: string;
  name: string;
  description: string;
};

export type MajorType = {
  id: number;
  univ: string;
  sido_code: string;
  name: string;
  department: string;
  std_lclsf_name: string;
  std_mclsf_name: string;
  std_sclsf_name: string;
  _specification?: string;
  investigation_year: string;
  status: "DELETE" | "ACTIVE";
};

export type MajorCategoryGroupType = {
  id: number;
  major_id: number;
  general_code: string;
};

export type OptionalSubjectType = {
  code: string;
  group: string;
  student_category?: StudentCategoryCode;
  category: string;
  name: string;
  description: string;
  suneung_info: string;
  etc_info: string;
};

export type RecommendGroupType = {
  id: string;
  gnr_mjr_code: string;
  opt_sbj_code: string;
};

export type UnivType = {
  id: number;
  name: string;
  sido_code: string;
};
