import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  Department,
  DepartmentRepository,
} from "../../../domain/univ/univ.interface";
import { v4 as uuidv4 } from "uuid";
import { firebaseDb } from "../../firebase";
import { CollectionName } from "../../firebase/constants";
import { VERSION, YEAR } from "../_constant/constant";
import { orderBy } from "lodash";

const departmentRef = collection(
  firebaseDb,
  CollectionName.Version,
  VERSION,
  CollectionName.Year,
  YEAR,
  CollectionName.Department
);

const departmentRepository: DepartmentRepository = {
  async findBy(filter) {
    const conds = [];
    conds.push(orderBy("name"));

    let q = query(departmentRef);
    if (filter.nameKeyword) {
      q = query(departmentRef, where("name", ">=", filter.nameKeyword));
    }

    const snapshot = await getDocs(q);
    let _list: Department[] = [];
    snapshot.forEach((doc) => {
      _list.push(doc.data() as Department);
    });
    return _list;
  },
  async findByUnivId(name, univId) {
    const conds = [];
    conds.push(orderBy("name"));

    let q = query(departmentRef, where("universityId", "==", univId));

    if (name) {
      q = query(
        departmentRef,
        where("name", ">=", name),
        where("universityId", "==", univId)
      );
    }

    const snapshot = await getDocs(q);
    let _list: Department[] = [];
    snapshot.forEach((doc) => {
      _list.push(doc.data() as Department);
    });

    return _list;
  },
  async save(form, id) {
    // update
    if (id) {
      const docRef = doc(departmentRef, id);
      await setDoc(docRef, { ...form, updatedAt: new Date().valueOf() });
      return { id };
    }
    // create
    const departmentId = uuidv4();
    const docRef = doc(departmentRef, departmentId);
    try {
      await setDoc(docRef, { ...form, id: departmentId });
    } catch (error) {
      console.error(error);
    }
    return { id: departmentId };
  },
  async delete(id) {
    await deleteDoc(doc(departmentRef, id));
  },
  async createGuideline({ data, departmentId }) {
    const guidelineId = uuidv4();
    const docRef = doc(departmentRef, departmentId);
    try {
      await updateDoc(docRef, {
        guidelines: arrayUnion({ ...data, id: guidelineId }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    return { id: guidelineId };
  },
  async deleteGuideline({ departmentId, guidelineId }) {
    const docRef = doc(departmentRef, departmentId);
    const department = await getDoc(docRef);
    const departmentRecord = department.data() as Department;
    const removeTarget = departmentRecord.guidelines?.find(
      (item) => item.id === guidelineId
    );
    try {
      await updateDoc(docRef, {
        guidelines: arrayRemove(removeTarget),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    return { id: guidelineId };
  },
};

export default departmentRepository;
