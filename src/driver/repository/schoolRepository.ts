import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { CollectionName } from "../firebase/constants";
import { firebaseDb } from "../firebase";
import { v4 as uuidv4 } from "uuid";

import { School, SchoolRepository } from "../../domain/school/school.interface";

const schoolRef = collection(
  firebaseDb,
  "version",
  "1.0",
  CollectionName.Year,
  "2024",
  CollectionName.School
);

const schoolRepository: SchoolRepository = {
  async findBy(filter) {
    const conds = [];
    conds.push(orderBy("name"));

    const q = query(schoolRef);

    const snapshot = await getDocs(q);
    let _list: School[] = [];
    snapshot.forEach((doc) => {
      _list.push(doc.data() as School);
    });
    return _list.filter((v) => v.name.includes(filter.nameKeyword));
  },
  async findById(id) {
    const docRef = doc(schoolRef, id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data() as School;
    } else {
      return null;
    }
  },
  async save(form, id) {
    // update
    if (id) {
      const docRef = doc(schoolRef, id);
      await setDoc(docRef, form);
      return { id };
    }
    // create
    const schoolId = uuidv4();
    const docRef = doc(schoolRef, schoolId);
    try {
      await setDoc(docRef, { ...form, id: schoolId });
    } catch (error) {
      console.error(error);
    }
    return { id: schoolId };
  },
  async delete(id) {
    await deleteDoc(doc(schoolRef, id));
  },
};

export default schoolRepository;
