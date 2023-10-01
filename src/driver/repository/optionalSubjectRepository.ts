import { OptionalSubjectRepository } from "../../domain/subject/school.interface";
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
          category: v.category,
          name: v.name,
          description: v.description,
          suneungInfo: v.suneung_info,
          etcInfo: v.etc_info
        }
      });
  },
}

export default optionalSubjectRepository;
