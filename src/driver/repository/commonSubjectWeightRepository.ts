import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import { CommonSubjectWeight, CommonSubjectWeightRepository } from "../../domain/subject/school.interface";

const commonSubjectWeightRepository: CommonSubjectWeightRepository = {
  save: async (form) => {
    await setDoc(doc(firebaseDb, CollectionName.CommonSubjectWeight, form.subjectCode), form);
  },
  findAll: async () => {
    let data: CommonSubjectWeight[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, CollectionName.CommonSubjectWeight));
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as CommonSubjectWeight);
    });
    return data;
  },
};

export default commonSubjectWeightRepository;
