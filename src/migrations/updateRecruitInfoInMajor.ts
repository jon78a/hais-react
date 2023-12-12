import { StorageSource } from "../driver/firebase/constants";
import { firebaseStorage } from "../driver/firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import type { MajorModel } from "../driver/firebase/models";

export default async function updateRecruitInfoInMajor() {
  const source = StorageSource.Major;
  const res = await fetch(source);
  const list = await res.json();
  const jsonString = JSON.stringify(list.map((data: any): MajorModel => ({
    ...data,
    required_credits: [],
    required_groups: [],
    difficulty: 0
  })));
  const blob = new Blob([jsonString], { type: 'application/json' });
  const storageRef = ref(firebaseStorage, 'major.json');
  await uploadBytes(storageRef, blob);
}

export async function backupMajorFile() {
  const source = StorageSource.Major;
  const res = await fetch(source);
  const list = await res.json();
  const jsonString = JSON.stringify(list);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const storageRef = ref(firebaseStorage, 'backup/major_20231210.json');
  await uploadBytes(storageRef, blob);
}
