import { StorageSource } from "../../driver/firebase/constants";

import type {
  MajorModel,
  MajorCategoryGroupModel,
  RecommendGroupModel,
  UnivModel
} from "../../driver/firebase/models";

describe("Firebase storage connection", () => {
  it("MajorType(전체학과)", (done) => {
    fetch(StorageSource.Major)
      .then((res) => res.json())
      .then((data: MajorModel[]) => {
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
      .then((data: MajorCategoryGroupModel[]) => {
        data.forEach((majorCategoryGroup) => {
          expect(typeof majorCategoryGroup.id).toBe("number");
          expect(typeof majorCategoryGroup.general_code).toBe("string");
          expect(typeof majorCategoryGroup.major_id).toBe("number");
        });
        done();
      });
  });

  it("Univ(대학교)", (done) => {
    fetch(StorageSource.Univ)
      .then((res) => res.json())
      .then((data: UnivModel[]) => {
        data.forEach((univ) => {
          expect(typeof univ.id).toBe("number");
          expect(typeof univ.name).toBe("string");
          expect(typeof univ.sido_code).toBe("string");
        });
        done();
      })
  })
});
