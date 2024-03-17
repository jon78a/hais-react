import {
  doc,
  setDoc,
  where,
  getDocs,
  collection,
  query,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import {
  Student,
  StudentRepository,
} from "../../domain/subject/school.interface";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import { StudentGrade } from "../../schema/types/MyScore";

const studentRepository: StudentRepository = {
  async save(student) {
    const studentId = uuidv4();
    setDoc(doc(firebaseDb, CollectionName.Student, studentId), {
      ...student,
      id: studentId,
    });
  },
  async update(studentId, form) {
    const ref = doc(firebaseDb, CollectionName.Student, studentId);
    updateDoc(ref, form);
  },
  async updateSubjectScore(studentId, isCommonSubject, form) {
    const ref = doc(
      firebaseDb,
      CollectionName.Student,
      studentId,
      isCommonSubject ? "commonSubject" : "optionalSubject",
      form.subjectId
    );
    setDoc(ref, form);
  },
  async getSubjectGrade(studentId, isCommonSubject) {
    const ref = collection(
      firebaseDb,
      CollectionName.Student,
      studentId,
      isCommonSubject ? "commonSubject" : "optionalSubject"
    );
    const querySnapshot = await getDocs(ref);
    let studentScore: StudentGrade[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      studentScore.push({
        subjectId: docData.subjectId,
        grade: docData.grade,
      });
    });
    return studentScore!;
  },
  async findByUser(userId) {
    const q = query(
      collection(firebaseDb, CollectionName.Student),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    let student: Student | null = null;
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      student = {
        userId: docData.userId,
        id: docData.id,
        category: docData.category,
        name: docData.name,
        schoolYear: docData.schoolYear,
        targetMajor: docData.targetMajor,
        schoolId: docData.schoolId ?? "",
        commonSubject: docData.commonSubject,
        optionalSubject: docData.optionalSubject,
      };
    });
    return student!;
  },
};

export default studentRepository;
