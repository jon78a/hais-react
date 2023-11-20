import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import { CommonSubjectWeight, CommonSubjectWeightRepository } from "../../domain/subject/school.interface";
import { COMMON_SUBJECT_WEIGHTS } from "../localStorage/constants";

const commonSubjectWeightRepository: CommonSubjectWeightRepository = {
  save: async (form) => {
    await setDoc(doc(firebaseDb, CollectionName.CommonSubjectWeight, form.subjectCode), form);
  },
  findAll: async () => {
    let data: CommonSubjectWeight[] = [];
    const localItem = localStorage.getItem(COMMON_SUBJECT_WEIGHTS);
    if (localItem) {
      return JSON.parse(localItem);
    }

    const querySnapshot = await getDocs(collection(firebaseDb, CollectionName.CommonSubjectWeight));
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as CommonSubjectWeight);
    });
    localStorage.setItem(COMMON_SUBJECT_WEIGHTS, JSON.stringify(data));
    return data;
  },
};

export default commonSubjectWeightRepository;
