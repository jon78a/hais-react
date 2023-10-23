import { OptionalSubjectRepository } from "../../domain/subject/school.interface";
import { OptionalSubjectCategory } from "../../policy/school";
import { StorageSource } from "../firebase/constants";
import { MajorCategoryGroupType, OptionalSubjectType, RecommendGroupType } from "../firebase/types";

const optionalSubjectRepository: OptionalSubjectRepository = {
  async findByMajorId(majorId) {
    let source = StorageSource.MajorCategoryGroup;
    let res = await fetch(source);
    let mjrCategoryGroups: MajorCategoryGroupType[] = await res.json();

    const gnrMjrCodes = mjrCategoryGroups.filter((v) => v.major_id === majorId).map((v) => v.general_code);

    source = StorageSource.RecommendGroup;
    res = await fetch(source);
    let recommendGroups: RecommendGroupType[] = await res.json();

    const optSbjCodes = recommendGroups.filter((v) => gnrMjrCodes.includes(v.gnr_mjr_code)).map((v) => v.opt_sbj_code);

    source = StorageSource.OptionalSubject;
    res = await fetch(source);
    let optionalSubjects: OptionalSubjectType[] = await res.json();

    return optionalSubjects.filter((v) => optSbjCodes.includes(v.code))
      .map((v) => {
        return {
          code: v.code,
          group: v.group,
          subjectCategory: v.category as OptionalSubjectCategory,
          name: v.name,
          description: v.description,
          suneungInfo: v.suneung_info,
          etcInfo: v.etc_info
        }
      });
  },
  async findBy(filter) {
    const source = StorageSource.OptionalSubject;
    const res = await fetch(source);
    let optionalSubjects: OptionalSubjectType[] = await res.json();

    return optionalSubjects.map((v) => {
      return {
        code: v.code,
        group: v.group,
        studentCategory: undefined,
        subjectCategory: v.category as OptionalSubjectCategory,
        name: v.name,
        description: v.description,
        suneungInfo: v.suneung_info,
        etcInfo: v.etc_info
      }
    }).filter((v) => {
      if (!!filter.nameKeyword) {
        if (!v.name.includes(filter.nameKeyword)) return false;
      }
      return true;
    })
  },
  async findByCode(code) {
    const source = StorageSource.OptionalSubject;
    const res = await fetch(source);
    let optionalSubjects: OptionalSubjectType[] = await res.json();

    return optionalSubjects.map((v) => {
      return {
        code: v.code,
        group: v.group,
        studentCategory: undefined,
        subjectCategory: v.category as OptionalSubjectCategory,
        name: v.name,
        description: v.description,
        suneungInfo: v.suneung_info,
        etcInfo: v.etc_info
      }
    }).find((v) => v.code === code) ?? null;
  },
}

export default optionalSubjectRepository;
