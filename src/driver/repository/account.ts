import { AuthRepository } from "../../domain/account/auth.interface";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { OAuthClient } from "../oauth/client";

export const authRepository: AuthRepository = {
  async register(credential) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, credential.email, credential.password);
    return {userId: userCredential.user.uid}
  },
  async sendEmail(email) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      if (user.emailVerified) throw new Error("이미 인증된 유저입니다.");
      if (user.email !== email) throw new Error("전송할 이메일이 인증할 이메일과 다릅니다");
      return sendEmailVerification(auth.currentUser);
    }
    throw new Error("인증 양식을 먼저 제출해주세요");
  },
  oAuthLogin(oAuthProviderName) {
    const client = new OAuthClient(oAuthProviderName);
    client.provider.authorize();
  },
}
