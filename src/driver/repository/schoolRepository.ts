import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { CollectionName } from "../firebase/constants";
import { firebaseDb } from "../firebase";
import { v4 as uuidv4 } from "uuid";

import {
  School,
  SchoolRepository,
  SchoolSubject,
} from "../../domain/school/school.interface";

const schoolRef = collection(
  firebaseDb,
  "version",
  "1.0",
  CollectionName.Year,
  "2024",
  CollectionName.School
);

const commonSubjectRef = collection(
  firebaseDb,
  "version",
  "1.0",
  CollectionName.Year,
  "2024",
  "common"
);

const getSubjectRef = (schoolId: string) =>
  collection(
    firebaseDb,
    "version",
    "1.0",
    CollectionName.Year,
    "2024",
    CollectionName.School,
    schoolId,
    "subject"
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
  async findSubjectBy(filter, schoolId) {
    const conds = [];
    conds.push(orderBy("name"));

    const commonSubjectQuery = query(commonSubjectRef);
    const commonSubjectsSnapshot = await getDocs(commonSubjectQuery);
    let _subjects: SchoolSubject[] = [];
    commonSubjectsSnapshot.forEach((doc) => {
      _subjects.push(doc.data() as SchoolSubject);
    });

    const subjectRef = getSubjectRef(schoolId);
    const subjectsSnapshot = await getDocs(subjectRef);
    subjectsSnapshot.forEach((doc) => {
      _subjects.push(doc.data() as SchoolSubject);
    });

    return _subjects.filter((v) => v.name.includes(filter.nameKeyword));
  },
  async findSubjectById({ isCommonSubject, schoolId, subjectId }) {
    const subjectRef = getSubjectRef(schoolId);
    let docRef = doc(subjectRef, subjectId);

    if (isCommonSubject) {
      docRef = doc(commonSubjectRef, subjectId);
    }

    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data() as SchoolSubject;
    } else {
      return null;
    }
  },
  async deleteSubject({ isCommonSubject, schoolId, subjectId }) {
    // 공통과목
    if (isCommonSubject) {
      await deleteDoc(doc(commonSubjectRef, subjectId));
      return;
    }

    if (schoolId) {
      await deleteDoc(doc(getSubjectRef(schoolId)));
      return;
    }
  },
  async saveSubject({ form, schoolId, subjectId }) {
    // update
    if (subjectId) {
      let docRef = doc(schoolRef, schoolId, "subject", subjectId);
      if (form.type === "공통과목") docRef = doc(commonSubjectRef, subjectId);
      try {
        await setDoc(docRef, form);
      } catch (error) {
        console.error(error);
      }
      return { id: subjectId };
    }
    // create
    const newSubjectId = uuidv4();
    let docRef = doc(schoolRef, schoolId, "subject", newSubjectId);
    if (form.type === "공통과목") docRef = doc(commonSubjectRef, newSubjectId);
    try {
      await setDoc(docRef, { ...form, id: newSubjectId });
    } catch (error) {
      console.error(error);
    }
    return { id: newSubjectId };
  },
};

export default schoolRepository;
