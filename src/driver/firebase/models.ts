import type { StudentCategoryCode } from "../../policy/school";

export type GeneralMajorModel = {
  code: string;
  clsf_name: string;
  name: string;
  description: string;
};

export type MajorModel = {
  id: number | string;
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
  required_groups: string[];
  difficulty: number;
};

export type MajorCategoryGroupModel = {
  id: number;
  major_id: number;
  general_code: string;
};

export type OptionalSubjectModel = {
  code: string;
  group: string;
  student_category?: StudentCategoryCode;
  category: string;
  name: string;
  description: string;
  suneung_info: string;
  etc_info: string;
  credit_amount: number;
  difficulty: number;
};

export type RecommendGroupModel = {
  id: string;
  gnr_mjr_code: string;
  opt_sbj_code: string;
};

export type UnivModel = {
  id: number;
  name: string;
  sido_code: string;
};
