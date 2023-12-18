import {
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  where
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { CreditScore, CreditScoreRepository } from "../../domain/subject/school.interface";
import { CollectionName } from "../firebase/constants";
import { firebaseDb } from "../firebase";

const creditScoreRepository: CreditScoreRepository = {
  async save(score, key) {
    if (!key) { // create
      const uuid = uuidv4();
      await setDoc(doc(firebaseDb, CollectionName.CreditScore, uuid), {
        ...score,
        id: uuid
      });
    }
    else { // update
      await setDoc(doc(firebaseDb, CollectionName.CreditScore, key), {
        ...score,
        id: key
      });
    }
  },
  async findByStudent(studentId) {
    const q = query(collection(firebaseDb, CollectionName.CreditScore), where("studentId", "==", studentId));

    const creditScoreList: CreditScore[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      creditScoreList.push({
        id: docData.id,
        studentId: docData.studentId,
        subjectCode: docData.subjectCode,
        credit: docData.credit,
        category: docData.category,
        creditAmount: docData.creditAmount
      });
    });

    return creditScoreList;
  },
};

export default creditScoreRepository;
