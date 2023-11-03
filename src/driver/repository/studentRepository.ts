import {
  doc,
  setDoc,
  getDoc,
  where,
  getDocs,
  collection,
  query
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import {
  Student,
  StudentRepository
} from "../../domain/subject/school.interface";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";

const studentRepository: StudentRepository = {
  async save(student) {
    const studentId = uuidv4();
    setDoc(doc(firebaseDb, CollectionName.Student, studentId), {
      ...student,
      id: studentId
    });
  },
  async findByUser(userId) {
    const q = query(collection(firebaseDb, CollectionName.Student), where("userId", "==", userId));
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
        targetMajor: docData.targetMajor
      };
    });
    return student!;
  },
}

export default studentRepository;
