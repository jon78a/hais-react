import { ref, uploadString } from "firebase/storage";

import { firebaseStorage } from "../firebase/firebase";
import { MajorCategoryGroupRepository } from "../../domain/subject/recommend.interface";
import { StorageSource } from "../firebase/constants";
import type { MajorCategoryGroupModel } from "../firebase/models";
import { MAJOR_CATEGORY_GROUPS } from "../localStorage/constants";

const majorCategoryGroupRepository: MajorCategoryGroupRepository = {
  async getByMajorId(majorId) {
    const source = StorageSource.MajorCategoryGroup;
    const payload: MajorCategoryGroupModel[] = await fetch(source).then((res) =>
      res.json()
    );
    localStorage.setItem(MAJOR_CATEGORY_GROUPS, JSON.stringify(payload));

    const obj = payload.find((item) => item.major_id === majorId);
    if (!obj) {
      throw new Error("Major id NOT FOUND.");
    }
    return {
      id: obj.id,
      majorId: obj.major_id,
      generalCode: obj.general_code,
    };
  },
  async save(form) {
    try {
      const localItem = localStorage.getItem(MAJOR_CATEGORY_GROUPS);
      if (!localItem) {
        throw new Error("getByMajorId가 선행되어야 합니다.");
      }
      const snapshot: MajorCategoryGroupModel[] = JSON.parse(localItem);

      const requestData: MajorCategoryGroupModel[] = snapshot.map((obj) => {
        if (obj.major_id === form.majorId) {
          return {
            id: form.id,
            major_id: form.majorId,
            general_code: form.generalCode,
          };
        }
        return obj;
      });

      const jsonString = JSON.stringify(requestData);
      const storageRef = ref(
        firebaseStorage,
        StorageSource.filePath.majorCategoryGroup
      );

      await uploadString(storageRef, jsonString, "raw");
    } catch (e) {
      localStorage.removeItem(MAJOR_CATEGORY_GROUPS);
      throw e;
    }
  },
};

export default majorCategoryGroupRepository;
