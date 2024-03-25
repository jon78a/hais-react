import { collection, doc, getDoc } from "firebase/firestore";
import { YearRepository } from "../../domain/year/year.interface";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import { VERSION } from "./_constant/constant";

const yearRef = collection(
  firebaseDb,
  CollectionName.Version,
  VERSION,
  CollectionName.Year
);

const yearRepository: YearRepository = {
  async getCredit(year) {
    const ref = doc(yearRef, year);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return snapshot.data().credit as unknown as number;
    } else {
      return null;
    }
  },
};

export default yearRepository;
