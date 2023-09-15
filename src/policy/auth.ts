export type AuthType = "KAKAO" | "NAVER" | "NORMAL";

export enum OAuthEnum {
  KAKAO = "kakao",
  NAVER = "naver"
}

export function generateOAuthPassword(length: number): string {
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?";
  let password: string = '';

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

export function generateOAuthEmail(oAuthProviderName: OAuthEnum): string {
  return `${oAuthProviderName}_${Math.floor(Date.now())}@${oAuthProviderName}.com`;
}

export const AUTH_SESSION_TTL = 1800;
