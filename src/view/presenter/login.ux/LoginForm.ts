import type { SocialType } from "../../../policy/auth";

export interface LoginFormUx {
  inputEmail: (value: string) => void;
  inputPassword: (value: string) => void;
  clickLoginButton: () => void;
  clickSocial: (socialType: SocialType) => void;
}
