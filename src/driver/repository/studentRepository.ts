import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import {
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
}

export default studentRepository;
