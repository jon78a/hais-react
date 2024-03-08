import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Univ, UnivRepository } from "../../../domain/univ/univ.interface";
import { v4 as uuidv4 } from "uuid";
import { firebaseDb } from "../../firebase";
import { CollectionName } from "../../firebase/constants";
import { VERSION, YEAR } from "../_constant/constant";
import { orderBy } from "lodash";

const univRef = collection(
  firebaseDb,
  CollectionName.Version,
  VERSION,
  CollectionName.Year,
  YEAR,
  CollectionName.Univ
);

const univRepository: UnivRepository = {
  async save(form, id) {
    // update
    if (id) {
      const docRef = doc(univRef, id);
      await setDoc(docRef, { ...form, updatedAt: new Date().valueOf() });
      return { id };
    }
    // create
    const schoolId = uuidv4();
    const docRef = doc(univRef, schoolId);
    try {
      await setDoc(docRef, { ...form, id: schoolId });
    } catch (error) {
      console.error(error);
    }
    return { id: schoolId };
  },
  async delete(id) {
    await deleteDoc(doc(univRef, id));
  },
  async findBy(filter) {
    const conds = [];
    conds.push(orderBy("name"));

    let q = query(univRef);

    if (filter.nameKeyword) {
      q = query(univRef, where("name", ">=", filter.nameKeyword));
    }

    const snapshot = await getDocs(q);
    let _list: Univ[] = [];
    snapshot.forEach((doc) => {
      _list.push(doc.data() as Univ);
    });
    return _list;
  },
  async findById(id) {
    const docRef = doc(univRef, id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data() as Univ;
    } else {
      return null;
    }
  },
};

export default univRepository;
