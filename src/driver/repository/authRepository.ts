import {
  query,
  collection,
  where,
  getDocs
} from "firebase/firestore";

import { AuthRepository } from "../../domain/account/auth.interface";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { OAuthClient } from "../oauth/client";
import { firebaseDb } from "../firebase";
import { CollectionName } from "../firebase/constants";
import { ErrorStatus } from "../../policy/errors";

const authRepository: AuthRepository = {
  async register(credential) {
    const auth = getAuth();
    if (auth.currentUser) {
      return { userId: auth.currentUser.uid }
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credential.email, credential.password);
      return { userId: userCredential.user.uid }
    } catch (e: any) {
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
  async oAuthAuthorize(oAuthProviderName) {
    const client = new OAuthClient(oAuthProviderName);
    client.provider.authorize();
  },
  async oAuthLogout(oAuthProviderName) {
    const client = new OAuthClient(oAuthProviderName);
    const result = client.provider.logout();
    if (!result) {
      window.location.replace(`/oauth/logout/${oAuthProviderName}`);
    }
  },
  async validateUserByCredential(credential) {
    const q = query(collection(firebaseDb, CollectionName.User),
      where("email", "==", credential.email)
    );
    const querySnapshot = await getDocs(q);
    let userExists = false;
    querySnapshot.forEach((doc) => {
      userExists = true;
      const user = doc.data();
      if (user.password !== credential.password) throw new Error(ErrorStatus.INVALID_USER_PASSWORD);
      if (!user.activated) throw new Error(ErrorStatus.USER_INACTIVE);
      if (!user.verified) throw new Error(ErrorStatus.NOT_VERIFIED_USER);
    });
    if (!userExists) throw new Error(ErrorStatus.INVALID_USER_EMAIL);
  },
}

export default authRepository;
