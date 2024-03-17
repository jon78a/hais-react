import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { CollectionName } from "../firebase/constants";
import { firebaseDb } from "../firebase";
import { v4 as uuidv4 } from "uuid";

import {
  School,
  SchoolRepository,
  SchoolSubject,
} from "../../domain/school/school.interface";
import { VERSION, YEAR } from "./_constant/constant";
import { SchoolSubjectType } from "../../policy/school";

const schoolRef = collection(
  firebaseDb,
  CollectionName.Version,
  VERSION,
  CollectionName.Year,
  YEAR,
  CollectionName.School
);

export const commonSubjectRef = collection(
  firebaseDb,
  CollectionName.Version,
  VERSION,
  CollectionName.Year,
  YEAR,
  CollectionName.CommonSubject
);

export const optionalSubjectRef = collection(
  firebaseDb,
  CollectionName.Version,
  VERSION,
  CollectionName.Year,
  YEAR,
  CollectionName.OptionalSubject
);

const schoolRepository: SchoolRepository = {
  async findBy(filter) {
    const conds = [];
    conds.push(orderBy("name"));

    const q = query(schoolRef);

    const snapshot = await getDocs(q);
    let _list: School[] = [];
    snapshot.forEach((doc) => {
      _list.push(doc.data() as School);
    });
    return _list.filter((v) => v.name.includes(filter.nameKeyword));
  },
  async findById(id) {
    const docRef = doc(schoolRef, id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data() as School;
    } else {
      return null;
    }
  },
  async save(form, id) {
    // update
    if (id) {
      const docRef = doc(schoolRef, id);
      await setDoc(docRef, { ...form, updatedAt: new Date().valueOf() });
      return { id };
    }
    // create
    const schoolId = uuidv4();
    const docRef = doc(schoolRef, schoolId);
    try {
      await setDoc(docRef, { ...form, id: schoolId });
    } catch (error) {
      console.error(error);
    }
    return { id: schoolId };
  },
  async delete(id) {
    await deleteDoc(doc(schoolRef, id));
  },
  async findSubjectBy(filter) {
    let _subjects: SchoolSubject[] = [];

    const conds = [];
    conds.push(orderBy("name"));

    const commonSubjectQuery = query(commonSubjectRef);
    const commonSubjectsSnapshot = await getDocs(commonSubjectQuery);
    commonSubjectsSnapshot.forEach((doc) => {
      _subjects.push(doc.data() as SchoolSubject);
    });

    const optionalSubjectQuery = query(optionalSubjectRef);
    const subjectsSnapshot = await getDocs(optionalSubjectQuery);
    subjectsSnapshot.forEach((doc) => {
      _subjects.push(doc.data() as SchoolSubject);
    });

    return _subjects.filter((v) => v.name.includes(filter.nameKeyword));
  },
  async getCommonSubjects() {
    let _subjects: SchoolSubject[] = [];

    const conds = [];
    conds.push(orderBy("name"));

    const commonSubjectQuery = query(commonSubjectRef);
    const commonSubjectsSnapshot = await getDocs(commonSubjectQuery);
    commonSubjectsSnapshot.forEach((doc) => {
      _subjects.push(doc.data() as SchoolSubject);
    });

    return _subjects;
  },
  async getOptionalSubjects(schoolId) {
    let _subjects: SchoolSubject[] = [];

    const conds = [];
    conds.push(orderBy("name"));

    const optionalSubjectQuery = query(
      optionalSubjectRef,
      where("schoolId", "==", schoolId)
    );
    const subjectsSnapshot = await getDocs(optionalSubjectQuery);
    subjectsSnapshot.forEach((doc) => {
      _subjects.push(doc.data() as SchoolSubject);
    });

    return _subjects;
  },
  async findSubjectByType(type: SchoolSubjectType) {
    let _subjects: SchoolSubject[] = [];

    const conds = [];
    conds.push(orderBy("name"));
    if (!type) return null;

    let subjectQuery = null;
    if (type === "공통과목") subjectQuery = query(commonSubjectRef);
    else subjectQuery = query(optionalSubjectRef, where("type", "==", type));

    const commonSubjectsSnapshot = await getDocs(subjectQuery);
    commonSubjectsSnapshot.forEach((doc) => {
      _subjects.push(doc.data() as SchoolSubject);
    });

    return _subjects;
  },
  async findSubjectById({ isCommonSubject, subjectId }) {
    const subjectRef = isCommonSubject ? commonSubjectRef : optionalSubjectRef;

    const docRef = doc(subjectRef, subjectId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data() as SchoolSubject;
    } else {
      return null;
    }
  },
  async deleteSubject({ isCommonSubject, subjectId }) {
    // 공통과목
    const subjectRef = isCommonSubject ? commonSubjectRef : optionalSubjectRef;
    await deleteDoc(doc(subjectRef, subjectId));
  },
  async saveSubject({ form, subjectId }) {
    const isCommonSubject = form.type === "공통과목";
    const subjectRef = isCommonSubject ? commonSubjectRef : optionalSubjectRef;
    let updatedForm = { ...form };
    if (isCommonSubject) updatedForm.schoolId = "";
    // update
    if (subjectId) {
      const docRef = doc(subjectRef, subjectId);
      try {
        await setDoc(docRef, updatedForm);
      } catch (error) {
        console.error(error);
      }
      return { id: subjectId };
    }
    // create
    const newSubjectId = uuidv4();
    const docRef = doc(subjectRef, newSubjectId);
    try {
      await setDoc(docRef, { ...updatedForm, id: newSubjectId });
    } catch (error) {
      console.error(error);
    }
    return { id: newSubjectId };
  },
};

export default schoolRepository;
