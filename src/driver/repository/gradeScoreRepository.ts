import {
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  where
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { GradeScore, GradeScoreRepository } from "../../domain/subject/school.interface";
import { CollectionName } from "../firebase/constants";
import { firebaseDb } from "../firebase";

const gradeScoreRepository: GradeScoreRepository = {
  async save(score, key) {
    if (!key) { // create
      const uuid = uuidv4();
      await setDoc(doc(firebaseDb, CollectionName.GradeScore, uuid), {
        ...score,
        id: uuid
      });
    }
    else { // update
      await setDoc(doc(firebaseDb, CollectionName.GradeScore, key), {
        ...score,
        id: key
      });
    }
  },
  async findByStudent(studentId) {
    const q = query(collection(firebaseDb, CollectionName.GradeScore), where("studentId", "==", studentId));

    const gradeScoreList: GradeScore[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      gradeScoreList.push({
        id: docData.id,
        studentId: docData.studentId,
        subjectCode: docData.subjectCode,
        grade: docData.grade,
        category: docData.category
      });
    });

    return gradeScoreList;
  },
};

export default gradeScoreRepository;
