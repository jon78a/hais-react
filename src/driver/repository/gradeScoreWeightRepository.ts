import {
  setDoc,
  doc,
  getDocs,
  collection
} from "firebase/firestore";

import { CollectionName } from "../firebase/constants";
import { firebaseDb } from "../firebase";
import { GradeScoreWeight, GradeScoreWeightRepository } from "../../domain/subject/school.interface";
import { GRADE_SCORE_WEIGHTS } from "../localStorage/constants";

const gradeScoreWeightRepository: GradeScoreWeightRepository = {
  save: async (form) => {
    await setDoc(doc(firebaseDb, CollectionName.GradeScoreWeight, String(form.scoreType)), form);
  },
  findAll: async () => {
    const localItem = localStorage.getItem(GRADE_SCORE_WEIGHTS);
    if (localItem) {
      return JSON.parse(localItem);
    }

    let data: GradeScoreWeight[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, CollectionName.GradeScoreWeight));
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as GradeScoreWeight);
    });
    localStorage.setItem(GRADE_SCORE_WEIGHTS, JSON.stringify(data));
    return data;
  },
};

export default gradeScoreWeightRepository;
