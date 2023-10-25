import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  orderBy,
  deleteDoc
} from "firebase/firestore";

import { OptionalSubject, OptionalSubjectRepository } from "../../domain/subject/school.interface";
import { OptionalSubjectCategory } from "../../policy/school";
import { CollectionName, StorageSource } from "../firebase/constants";
import { MajorCategoryGroupType, OptionalSubjectType, RecommendGroupType } from "../firebase/types";
import { firebaseDb } from "../firebase";

const optionalSubjectRepository: OptionalSubjectRepository = {
  async findByMajorId(majorId) {
    let source = StorageSource.MajorCategoryGroup;
    let res = await fetch(source);
    let mjrCategoryGroups: MajorCategoryGroupType[] = await res.json();

    const gnrMjrCodes = mjrCategoryGroups.filter((v) => v.major_id === majorId).map((v) => v.general_code);

    let recommendGroups: RecommendGroupType[] = [];
    const recommendGroupSnapshot = await getDocs(collection(firebaseDb, CollectionName.RecommendGroup));
    recommendGroupSnapshot.forEach((doc) => {
      recommendGroups.push(doc.data() as RecommendGroupType);
    });

    const optSbjCodes = recommendGroups.filter((v) => gnrMjrCodes.includes(v.gnr_mjr_code)).map((v) => v.opt_sbj_code);

    let optionalSubjects: OptionalSubjectType[] = [];
    const optionalSubjectSnapshot = await getDocs(collection(firebaseDb, CollectionName.OptionalSubject));
    optionalSubjectSnapshot.forEach((doc) => {
      optionalSubjects.push(doc.data() as OptionalSubjectType);
    });

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
    const conds = [];
    conds.push(orderBy("group"));

    const q = query(collection(firebaseDb, CollectionName.OptionalSubject), ...conds);
  
    const snapshot = await getDocs(q);
    let _list: OptionalSubject[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      _list.push({
        code: data.code,
        group: data.group,
        studentCategory: undefined,
        subjectCategory: data.category as OptionalSubjectCategory,
        name: data.name,
        description: data.description,
        suneungInfo: data.suneung_info,
        etcInfo: data.etc_info
      });
    });
    return _list.filter((v) => v.name.includes(filter.nameKeyword));
  },
  async findByCode(code) {
    const docRef = doc(firebaseDb, CollectionName.OptionalSubject, code);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        code: data.code,
        group: data.group,
        studentCategory: undefined,
        subjectCategory: data.category as OptionalSubjectCategory,
        name: data.name,
        description: data.description,
        suneungInfo: data.suneung_info,
        etcInfo: data.etc_info
      }
    } else return null;
  },
  async delete(key) {
    await deleteDoc(doc(firebaseDb, CollectionName.OptionalSubject, key));
  },
}

export default optionalSubjectRepository;
