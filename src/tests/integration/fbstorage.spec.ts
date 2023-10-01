import { StorageSource } from "../../driver/firebase/constants";

import type {
  GeneralMajorType,
  MajorType,
  MajorCategoryGroupType,
  OptionalSubjectType,
  RecommendGroupType,
  UnivType
} from "../../driver/firebase/types";

describe("Firebase storage connection", () => {
  it("GeneralMajor(일반학과)", (done) => {
    fetch(StorageSource.GeneralMajor)
      .then((res) => res.json())
      .then((data: GeneralMajorType[]) => {
        data.forEach((generalMajor) => {
          expect(typeof generalMajor.clsf_name).toBe("string");
          expect(typeof generalMajor.code).toBe("string");
          expect(typeof generalMajor.description).toBe("string");
          expect(typeof generalMajor.name).toBe("string");
        })
        done();
      })
  });

  it("MajorType(전체학과)", (done) => {
    fetch(StorageSource.Major)
      .then((res) => res.json())
      .then((data: MajorType[]) => {
        data.forEach((major) => {
          expect(typeof major.id).toBe("number");
          expect(typeof major.department).toBe("string");
          expect(typeof major.investigation_year).toBe("string");
          expect(typeof major.name).toBe("string");
          expect(typeof major.sido_code).toBe("string");

          expect(major.status === "DELETE" || major.status === "ACTIVE").toBe(true);
          expect(typeof major.std_lclsf_name).toBe("string");
          expect(typeof major.std_mclsf_name).toBe("string");
          expect(typeof major.std_sclsf_name).toBe("string");
          expect(typeof major.univ).toBe("string");
        });
        done();
      });
  });

  it("MajorCategoryGroup(학과분류그룹)", (done) => {
    fetch(StorageSource.MajorCategoryGroup)
      .then((res) => res.json())
      .then((data: MajorCategoryGroupType[]) => {
        data.forEach((majorCategoryGroup) => {
          expect(typeof majorCategoryGroup.id).toBe("number");
          expect(typeof majorCategoryGroup.general_code).toBe("string");
          expect(typeof majorCategoryGroup.major_id).toBe("number");
        });
        done();
      });
  });

  it("OptionalSubject(선택과목)", (done) => {
    fetch(StorageSource.OptionalSubject)
      .then((res) => res.json())
      .then((data: OptionalSubjectType[]) => {
        data.forEach((optionalSubject) => {
          expect(typeof optionalSubject.category).toBe("string");
          expect(typeof optionalSubject.code).toBe("string");
          expect(typeof optionalSubject.description).toBe("string");
          expect(typeof optionalSubject.etc_info).toBe("string");
          expect(typeof optionalSubject.group).toBe("string");  // 범주 ex) 과학, 영어, 수학
          expect(typeof optionalSubject.name).toBe("string");
          expect(typeof optionalSubject.suneung_info).toBe("string");
        });
        done();
      });
  });

  it("RecommendGroup(추천그룹)", (done) => {
    fetch(StorageSource.RecommendGroup)
      .then((res) => res.json())
      .then((data: RecommendGroupType[]) => {
        data.forEach((recommendGroup) => {
          expect(typeof recommendGroup.gnr_mjr_code).toBe("string");
          expect(typeof recommendGroup.opt_sbj_code).toBe("string");
          expect(typeof recommendGroup.id).toBe("number");
        });
      });
      done();
  });

  it("Univ(대학교)", (done) => {
    fetch(StorageSource.Univ)
      .then((res) => res.json())
      .then((data: UnivType[]) => {
        data.forEach((univ) => {
          expect(typeof univ.id).toBe("number");
          expect(typeof univ.name).toBe("string");
          expect(typeof univ.sido_code).toBe("string");
        });
        done();
      })
  })
});
