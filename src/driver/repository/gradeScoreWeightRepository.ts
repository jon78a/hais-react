import {
  setDoc,
  doc,
  getDocs,
  collection
} from "firebase/firestore";

import { CollectionName } from "../firebase/constants";
import { firebaseDb } from "../firebase";
import { GradeScoreWeight, GradeScoreWeightRepository } from "../../domain/subject/school.interface";

const gradeScoreWeightRepository: GradeScoreWeightRepository = {
  save: async (form) => {
    await setDoc(doc(firebaseDb, CollectionName.GradeScoreWeight, String(form.scoreType)), form);
  },
  findAll: async () => {
    let data: GradeScoreWeight[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, CollectionName.GradeScoreWeight));
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as GradeScoreWeight);
    });
    return data;
  },
};

export default gradeScoreWeightRepository;
