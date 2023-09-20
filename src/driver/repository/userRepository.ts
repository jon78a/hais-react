import {
  doc,
  setDoc,
  getDoc,
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
import { CollectionName, ErrorStatus } from "../firebase/constants";
import {
  setAuthSession,
} from "../sessionStorage/auth";
import { authorizeRequired } from "../handler";

const userRepository: UserRepository = {
  async save(user) {
    try {
      if (user.authType === "NORMAL") {
        const auth = getAuth();
        if (!auth.currentUser?.emailVerified) {
          throw new Error(ErrorStatus.NOT_VERIFIED_USER);
        }
      }
      const docRef = doc(firebaseDb, CollectionName.User, user.id);
      setDoc(docRef, user);
      setAuthSession(user.id, "GRANT");
    } catch (e) {
      console.error(e);
    }
  },
  async findByUserId(userId) {
    authorizeRequired();

    const docRef = doc(firebaseDb, CollectionName.User, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as User;
    } else {
      throw new Error(ErrorStatus.USER_NOT_FOUND);
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
}

export default userRepository;
