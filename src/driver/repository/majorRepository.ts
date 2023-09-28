import { StorageSource } from "../firebase/constants";
import { MajorRepository } from "../../domain/subject/univ.interface";
import type { MajorType } from "../firebase/types";

const majorRepository: MajorRepository = {
  async findByNameLikeWithUniv(keyword, univ) {
    const source = StorageSource.Major;
    const res = await fetch(source);
    const data: MajorType[] = await res.json();
    return data
      .filter((v) => v["univ"] === univ && v["name"].startsWith(keyword))
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
          stdSclsfName: v["std_sclsf_name"]
        }
      });
  },
}

export default majorRepository;
