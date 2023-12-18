import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firebaseDb } from "../driver/firebase";
import { CollectionName } from "../driver/firebase/constants";
import { CreditScore } from "../domain/subject/school.interface";

export default async function addCreditAmountFieldOnCreditScore() {
  const DEFAULT_FIELD_VALUE = 0;
  const snapshot = await getDocs(collection(firebaseDb, CollectionName.CreditScore));
  const documents: CreditScore[] = [];
  snapshot.forEach((doc) => {
    const docData = doc.data();
    documents.push({
      id: docData.id,
      studentId: docData.studentId,
      subjectCode: docData.subjectCode,
      credit: docData.credit,
      category: docData.category,
      creditAmount: DEFAULT_FIELD_VALUE
    });
  });
  for (const data of documents) {
    await setDoc(doc(firebaseDb, CollectionName.CreditScore, data.id), data);
  };
}
