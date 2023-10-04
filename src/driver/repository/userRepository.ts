import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs
} from "firebase/firestore";

import { User, UserRepository } from "../../domain/account/user.interface";
import {
  getAuth,
} from "firebase/auth";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import { ErrorStatus } from "../../policy/errors";

const userRepository: UserRepository = {
  async save(user) {
    try {
      if (user.authChoice === "NORMAL") {
        const auth = getAuth();
        if (!auth.currentUser?.emailVerified) {
          throw new Error(ErrorStatus.NOT_VERIFIED_USER);
        }
      }
      const docRef = doc(firebaseDb, CollectionName.User, user.id);
      setDoc(docRef, user);
    } catch (e) {
      console.error(e);
    }
  },
  async findByUserId(userId) {
    const docRef = doc(firebaseDb, CollectionName.User, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as User;
    } else {
      return null;
    }
  },
  // admin으로 옮겨줄 것
  async findByCredential(email: string, password: string) {
    const q = query(collection(firebaseDb, CollectionName.User),
      where("email", "==", email),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    let user: User | null = null;
    querySnapshot.forEach((doc) => {
      user = doc.data() as User;
    });
    return user;
  },
  async update(userId, req) {
    const docRef = doc(firebaseDb, CollectionName.User, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, req);
    }
  },
}

export default userRepository;
