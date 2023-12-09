import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

import type { RecommendGroupType } from "../firebase/types";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import {
  RecommendGroup,
  RecommendGroupRepository,
} from "../../domain/subject/recommend.interface";

const recommendGroupRepository: RecommendGroupRepository = {
  async findByGeneralCode(code) {
    const q = query(
      collection(firebaseDb, CollectionName.RecommendGroup),
      where("gnr_mjr_code", "==", code)
    );
    let recommendGroups: RecommendGroup[] = [];
    const recommendGroupSnapshot = await getDocs(q);
    recommendGroupSnapshot.forEach((doc) => {
      const data = doc.data() as RecommendGroupType;
      recommendGroups.push({
        id: data.id,
        generalCode: data.gnr_mjr_code,
        optionalSubjectCode: data.opt_sbj_code,
      });
    });

    return recommendGroups;
  },
  async createBulk(list) {
    const batch = writeBatch(firebaseDb);
    list.forEach((v) => {
      const docRef = doc(firebaseDb, CollectionName.RecommendGroup, v.id);
      const data: RecommendGroupType = {
        id: v.id,
        gnr_mjr_code: v.generalCode,
        opt_sbj_code: v.optionalSubjectCode,
      };
      batch.set(docRef, data);
    });
    await batch.commit();
  },
};

export default recommendGroupRepository;
