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
import { AuthRepository } from "../../domain/account/auth.interface";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { OAuthClient } from "../oauth/client";
import { firebaseDb } from "../firebase";
import { CollectionName, ErrorStatus } from "../firebase/constants";
import {
  setAuthSession,
  removeAuthSession,
  removeUserSession,
  getValidUserId,
  setUserSession,
  getUserSession
} from "../sessionStorage/auth";
import { authorizeRequired } from "../handler";

export const userRepository: UserRepository = {
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
    } catch(e) {
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
  saveUserOnClient(user) {
    setUserSession(user);
  },
  removeUserOnClient() {
    removeUserSession();
  },
  getUserOnClient() {
    return getUserSession();
  },
}

export const authRepository: AuthRepository = {
  async register(credential) {
    const auth = getAuth();
    if (auth.currentUser) {
      return {userId: auth.currentUser.uid}
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credential.email, credential.password);
      return {userId: userCredential.user.uid}
    } catch(e: any) {
      throw new Error(ErrorStatus.NOT_VERIFIED_USER);
    }
  },
  async sendEmail(email) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      if (user.emailVerified) return;
      if (user.email !== email) throw new Error(ErrorStatus.DIFFERENT_EMAIL);
      return sendEmailVerification(auth.currentUser).then(
        () => alert("이메일을 인증하면 다음 단계로 이동합니다.")
      );
    }
    throw new Error(ErrorStatus.UNSUBMIT_CREDENTIAL);
  },
  oAuthAuthorize(oAuthProviderName) {
    const client = new OAuthClient(oAuthProviderName);
    client.provider.authorize();
  },
  async unregister() {
    removeAuthSession();

    const userId = getValidUserId();
    if (!userId) throw new Error(ErrorStatus.USER_SESSION_OUT);
    const docRef = doc(firebaseDb, CollectionName.User, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      updateDoc(docRef, {
        activated: false
      });
    }
  },
  async login(credential) {
    const q = query(collection(firebaseDb, CollectionName.User),
      where("email", "==", credential.email)
    );
    const querySnapshot = await getDocs(q);
    let userExists = false;
    querySnapshot.forEach((doc) => {
      userExists = true;
      const user = doc.data();
      if (user.password !== credential.password) throw new Error(ErrorStatus.INVALID_USER_PASSWORD);
      setAuthSession(user.id, "GRANT");
    });
    if (!userExists) throw new Error(ErrorStatus.INVALID_USER_EMAIL);
  },
  async logout() {
    removeAuthSession();
  },
}
