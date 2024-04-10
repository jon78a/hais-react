import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, getDoc } from "firebase/firestore";

import {
  AuthSession,
  AuthSessionRepository,
} from "../../domain/account/auth.interface";
import { User } from "../../domain/account/user.interface";
import { AUTH_SESSION_KEY } from "../sessionStorage/constants";
import { AUTH_SESSION_TTL } from "../../policy/auth";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";

const authSessionRepository: AuthSessionRepository = {
  async save(userId, status) {
    const docRef = doc(firebaseDb, CollectionName.User, userId);
    const docSnap = await getDoc(docRef);
    let user: User;
    if (docSnap.exists()) {
      user = docSnap.data() as User;
    } else {
      return;
    }

    const id = uuidv4();
    const session: AuthSession = {
      id,
      exp: Math.floor(Date.now() / 1000) + AUTH_SESSION_TTL,
      userId,
      status,
      isAdmin: user.isAdmin || false,
      isPremium: user.isPremium ?? false,
      premiumId: user.premiumId ?? "",
    };

    await setDoc(doc(firebaseDb, CollectionName.AuthSession, id), {
      ...session,
      id,
    });

    sessionStorage.setItem(AUTH_SESSION_KEY, id);
  },
  async find() {
    const item = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!item) return null;
    const sessionId = item as string;

    const docRef = doc(firebaseDb, CollectionName.AuthSession, sessionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const session = docSnap.data() as AuthSession;
      const current = Math.floor(Date.now() / 1000);
      if (session.exp > current && session.status === "GRANT") return session;
      return null;
    }

    return null;
  },
  async clear() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  },
};

export default authSessionRepository;
