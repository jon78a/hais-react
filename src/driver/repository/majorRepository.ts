import { ref, uploadBytes, deleteObject, StorageReference } from "firebase/storage";

import { StorageSource } from "../firebase/constants";
import { firebaseStorage } from "../firebase/firebase";
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
  async updateRecruit(recruit, id) {
    const source = StorageSource.Major;
    const res = await fetch(source);
    const list: MajorModel[] = await res.json();

    let jsonString: string;
    let blob: Blob;
    let storageRef: StorageReference;

    jsonString = JSON.stringify(list);
    blob = new Blob([jsonString], { type: 'application/json' });
    storageRef = ref(firebaseStorage, `backup/major_${Date.now()}.json`);
    await uploadBytes(storageRef, blob);

    const oldFileRef = ref(firebaseStorage, StorageSource.filePath.major);
    await deleteObject(oldFileRef)

    const models: MajorModel[] = list.map((model) => {
      if (model.id === id) {
        return {
          ...model,
          required_credits: recruit.requiredCredits.map((value) => ({
            subject_category: value.subjectCategory,
            amount: value.amount
          })),
          required_groups: recruit.requiredGroups,
          difficulty: recruit.difficulty
        };
      }
      return model;
    });

    jsonString = JSON.stringify(models);
    blob = new Blob([jsonString], { type: 'application/json' });
    storageRef = ref(firebaseStorage, StorageSource.filePath.major);
    await uploadBytes(storageRef, blob);
  },
}

export default majorRepository;
