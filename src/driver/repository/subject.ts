import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import {
  SubjectRepository,
  ProfileScoreRepository,
  StudentRepository
} from "../../domain/subject/school.interface";
import {
  MajorRepository,
  TargetMajorRepository
} from "../../domain/subject/univ.interface";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";

export const studentRepository: StudentRepository = {
  async save(student) {
    const studentId = uuidv4();
    setDoc(doc(firebaseDb, CollectionName.Student, studentId), {
      ...student,
      id: studentId
    });
  },
}
