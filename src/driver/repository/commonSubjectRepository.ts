import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc
} from "firebase/firestore";

import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import { CommonSubjectRepository, CommonSubject } from "../../domain/subject/school.interface"

const commonSubjectRepository: CommonSubjectRepository = {
  async save(commonSubject, key) {
    if (!key) { // create
      const snapshot = await getDocs(collection(firebaseDb, CollectionName.CommonSubject));
      let maxCode = "0";
      snapshot.forEach((doc) => {
        if (Number(doc.data()["code"]) > Number(maxCode)) {
          maxCode = doc.data()["code"];
        }
      });
      const nextCode = String(Number(maxCode) + 1);
      const docRef = doc(firebaseDb, CollectionName.CommonSubject, nextCode);
      await setDoc(docRef, {
        ...commonSubject,
        code: nextCode
      });
    }
    else { // update
      const docRef = doc(firebaseDb, CollectionName.CommonSubject, key);
      await setDoc(docRef, commonSubject);
    }
  },
  async findBy(filter) {
    const conds = [];
    if (!!filter.nameKeyword) {
      conds.push(where("name", ">=", filter.nameKeyword))
    }
    const q = query(collection(firebaseDb, CollectionName.CommonSubject), ...conds);
  
    const snapshot = await getDocs(q);
    let _list: CommonSubject[] = [];
    snapshot.forEach((doc) => {
      _list.push(doc.data() as CommonSubject);
    });
    return _list
  },
  async findByCode(code) {
    const docRef = doc(firebaseDb, CollectionName.CommonSubject, code);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) return snapshot.data() as CommonSubject;
    return null;
  },
  async delete(key) {
    
  },
}

export default commonSubjectRepository;
