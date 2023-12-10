import { StorageSource } from "../firebase/constants";
import { MajorRepository } from "../../domain/subject/univ.interface";
import type { MajorModel } from "../firebase/models";

const majorRepository: MajorRepository = {
  async findByNameLikeWithUniv(keyword, univ) {
    const source = StorageSource.Major;
    const res = await fetch(source);
    const data: MajorModel[] = await res.json();
    return data
      .filter((v) => {
        if (v["univ"] !== univ) return false;
        if (v["name"] === "") return true;
        return v["name"].includes(keyword);
      })
      .map((v) => {
        return {
          id: v["id"],
          name: v["name"],
          univ: v["univ"],
          department: v["department"],
          investigationYear: v["investigation_year"],
          sidoCode: v["sido_code"],
          status: v["sido_code"] as ("ACTIVE" | "DELETE"),
          stdLclsfName: v["std_lclsf_name"],
          stdMclsfName: v["std_mclsf_name"],
          stdSclsfName: v["std_sclsf_name"],
          requiredCredits: v.required_credits.map((item) => ({
            subjectCategory: item.subject_category,
            amount: item.amount
          })),
          requiredGroups: v["required_groups"],
          difficulty: v["difficulty"]
        }
      });
  },
  async findByUnivOrMajorName(keyword) {
    const source = StorageSource.Major;
    const res = await fetch(source);
    const data: MajorModel[] = await res.json();
    return data
      .filter((v) => {
        if (v["univ"].includes(keyword) || v["name"].includes(keyword)) {
          return true;
        }
        return false;
      })
      .map((v) => {
        return {
          id: v["id"],
          name: v["name"],
          univ: v["univ"],
          department: v["department"],
          investigationYear: v["investigation_year"],
          sidoCode: v["sido_code"],
          status: v["sido_code"] as ("ACTIVE" | "DELETE"),
          stdLclsfName: v["std_lclsf_name"],
          stdMclsfName: v["std_mclsf_name"],
          stdSclsfName: v["std_sclsf_name"],
          requiredCredits: v.required_credits.map((item) => ({
            subjectCategory: item.subject_category,
            amount: item.amount
          })),
          requiredGroups: v["required_groups"],
          difficulty: v["difficulty"]
        }
      });
  },
}

export default majorRepository;
