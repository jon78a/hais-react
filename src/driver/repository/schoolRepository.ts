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

import { School, SchoolRepository } from "../../domain/school/school.interface";

const schoolRepository: SchoolRepository = {
  async findBy(filter) {
    const conds = [];
    conds.push(orderBy("name"));

    const q = query(collection(firebaseDb, CollectionName.School), ...conds);

    const snapshot = await getDocs(q);
    let _list: School[] = [];
    snapshot.forEach((doc) => {
      _list.push(doc.data() as School);
    });
    return _list.filter((v) => v.name.includes(filter.nameKeyword));
  },
  async findById(id) {
    const docRef = doc(firebaseDb, CollectionName.School, id);
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
      const docRef = doc(firebaseDb, CollectionName.School, id);
      await setDoc(docRef, form);
    }
  },
  async delete(id) {
    await deleteDoc(doc(firebaseDb, CollectionName.School, id));
  },
};

export default schoolRepository;
