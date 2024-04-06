import {
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { Univ, UnivRepository } from "../../../domain/univ/univ.interface";
import { v4 as uuidv4 } from "uuid";
import { firebaseDb } from "../../firebase";
import { CollectionName } from "../../firebase/constants";
import { VERSION, YEAR } from "../_constant/constant";

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
  async findBy({ filter, cursor, pageSize = 10, isPrev = false }) {
    const queryForData = query(
      univRef,
      orderBy("name"),
      ...(cursor
        ? [isPrev ? endBefore(cursor.name) : startAfter(cursor.name)]
        : []),
      limit(pageSize),
      ...(filter?.nameKeyword ? [where("name", ">=", filter.nameKeyword)] : [])
    );

    const queryForCount = query(
      univRef,
      ...(filter?.nameKeyword ? [where("name", ">=", filter.nameKeyword)] : [])
    );

    const [dataSnapshot, countSnapshot] = await Promise.all([
      getDocs(queryForData),
      getDocs(queryForCount),
    ]);

    const data = dataSnapshot.docs.map((doc) => doc.data() as Univ);
    const totalElements = countSnapshot.docs.length;

    return { data, totalElements };
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
