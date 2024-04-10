import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import {
  MyPremiumInfo,
  PremiumRepository,
} from "../../domain/premium/premium.interface";
import { firebaseStorage } from "../firebase/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";

const premiumRef = collection(firebaseDb, CollectionName.Premium);

const premiumRepository: PremiumRepository = {
  async save({ form, id }) {
    const updatedForm: MyPremiumInfo = { academyName: form.academyName };
    const logoFile = form.logo?.[0];
    const bannerFile = form.banner?.[0];

    const getDocRef = doc(premiumRef, id);
    const snapshot = await getDoc(getDocRef);

    const prevData = snapshot.data() as MyPremiumInfo;
    if (logoFile) {
      if (prevData.logoSrc) {
        deleteObject(ref(firebaseStorage, prevData.logoSrc));
      }

      const storageRef = ref(
        firebaseStorage,
        `premium_account/${id}/logo/${logoFile.name}`
      );
      const snapshot = await uploadBytes(storageRef, logoFile);
      updatedForm.logoSrc = snapshot.ref.fullPath;
    }

    if (bannerFile) {
      if (prevData.bannerSrc) {
        deleteObject(ref(firebaseStorage, prevData.bannerSrc));
      }

      const storageRef = ref(
        firebaseStorage,
        `premium_account/${id}/banner/${bannerFile.name}`
      );
      const snapshot = await uploadBytes(storageRef, bannerFile);
      updatedForm.bannerSrc = snapshot.ref.fullPath;
    }

    const docRef = doc(premiumRef, id);
    await setDoc(docRef, { ...updatedForm, updatedAt: new Date().valueOf() });
    return { id };
  },
  async get(id) {
    const docRef = doc(premiumRef, id);
    const snapshot = await getDoc(docRef);

    return snapshot.data() as MyPremiumInfo;
  },
};

export default premiumRepository;
