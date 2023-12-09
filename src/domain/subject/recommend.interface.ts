export interface MajorCategoryGroup {
  id: number;
  majorId: number;
  generalCode: string;
}

export interface RecommendGroup {
  id: string;
  generalCode: string;
  optionalSubjectCode: string;
}

export interface MajorCategoryGroupRepository {
  getByMajorId: (majorId: number) => Promise<MajorCategoryGroup>;
  save: (form: MajorCategoryGroup) => Promise<void>;
}

export interface RecommendGroupRepository {
  findByGeneralCode: (code: string) => Promise<RecommendGroup[]>;
  createBulk: (list: RecommendGroup[]) => Promise<void>;
}
