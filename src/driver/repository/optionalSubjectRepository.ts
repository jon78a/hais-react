import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  orderBy,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

import {
  OptionalSubject,
  OptionalSubjectRepository,
} from "../../domain/subject/school.interface";
import { CollectionName, StorageSource } from "../firebase/constants";
import {
  MajorCategoryGroupModel,
  OptionalSubjectModel,
  RecommendGroupModel,
} from "../firebase/models";
import { firebaseDb } from "../firebase";

const optionalSubjectRepository: OptionalSubjectRepository = {
  async findByMajorId(majorId) {
    let source = StorageSource.MajorCategoryGroup;
    let res = await fetch(source);
    let mjrCategoryGroups: MajorCategoryGroupModel[] = await res.json();

    const gnrMjrCodes = mjrCategoryGroups
      .filter((v) => v.major_id === majorId)
      .map((v) => v.general_code);

    let recommendGroups: RecommendGroupModel[] = [];
    const recommendGroupSnapshot = await getDocs(
      collection(firebaseDb, CollectionName.RecommendGroup)
    );
    recommendGroupSnapshot.forEach((doc) => {
      recommendGroups.push(doc.data() as RecommendGroupModel);
    });

    const optSbjCodes = recommendGroups
      .filter((v) => gnrMjrCodes.includes(v.gnr_mjr_code))
      .map((v) => v.opt_sbj_code);

    let optionalSubjects: OptionalSubjectModel[] = [];
    const optionalSubjectSnapshot = await getDocs(
      collection(firebaseDb, CollectionName.OptionalSubject)
    );
    optionalSubjectSnapshot.forEach((doc) => {
      optionalSubjects.push(doc.data() as OptionalSubjectModel);
    });

    return optionalSubjects
      .filter((v) => optSbjCodes.includes(v.code))
      .map((v) => {
        return {
          code: v.code,
          group: v.group,
          studentCategory: v.student_category ?? "NONE",
          subjectCategory: v.category,
          name: v.name,
          description: v.description,
          suneungInfo: v.suneung_info,
          etcInfo: v.etc_info,
          creditAmount: v.credit_amount,
        };
      });
  },
  async findBy(filter) {
    const conds = [];
    conds.push(orderBy("group"));

    const q = query(
      collection(firebaseDb, CollectionName.OptionalSubject),
      ...conds
    );

    const snapshot = await getDocs(q);
    let _list: OptionalSubject[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      _list.push({
        code: data.code,
        group: data.group,
        studentCategory: data.student_category ?? "NONE",
        subjectCategory: data.category,
        name: data.name,
        description: data.description,
        suneungInfo: data.suneung_info,
        etcInfo: data.etc_info,
        creditAmount: data.credit_amount,
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
        studentCategory: data.student_category ?? "NONE",
        subjectCategory: data.category,
        name: data.name,
        description: data.description,
        suneungInfo: data.suneung_info,
        etcInfo: data.etc_info,
        creditAmount: data.credit_amount,
      };
    } else return null;
  },
  async save(optionalSubject, key) {
    if (!key) {
      // create
      const snapshot = await getDocs(
        collection(firebaseDb, CollectionName.OptionalSubject)
      );
      let maxCode = "0";
      snapshot.forEach((doc) => {
        if (Number(doc.data()["code"]) > Number(maxCode)) {
          maxCode = doc.data()["code"];
        }
      });
      const nextCode = String(Number(maxCode) + 1);
      const docRef = doc(firebaseDb, CollectionName.OptionalSubject, nextCode);
      const data: OptionalSubjectModel = {
        code: nextCode,
        group: optionalSubject.group,
        student_category: optionalSubject.studentCategory,
        category: optionalSubject.subjectCategory,
        name: optionalSubject.name,
        description: optionalSubject.description,
        suneung_info: optionalSubject.suneungInfo,
        etc_info: optionalSubject.etcInfo,
        credit_amount: optionalSubject.creditAmount,
      };
      await setDoc(docRef, data);
    } else {
      // update
      const docRef = doc(firebaseDb, CollectionName.OptionalSubject, key);
      const data: OptionalSubjectModel = {
        code: optionalSubject.code,
        group: optionalSubject.group,
        student_category: optionalSubject.studentCategory,
        category: optionalSubject.subjectCategory,
        name: optionalSubject.name,
        description: optionalSubject.description,
        suneung_info: optionalSubject.suneungInfo,
        etc_info: optionalSubject.etcInfo,
        credit_amount: optionalSubject.creditAmount,
      };
      await setDoc(docRef, data);
    }
  },
  async delete(key) {
    await deleteDoc(doc(firebaseDb, CollectionName.OptionalSubject, key));
  },
};

export default optionalSubjectRepository;
