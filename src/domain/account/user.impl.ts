import { atom } from "recoil";

import { User, UserErrorMap, UserExceptionMap } from "./user.interface";
import type { DataStateType } from "../../types";

export const defaultUser: User = {
  id: "",
  email: "",
  password: "",
  authType: null,
  activated: false,
  verified: false,
  serviceAgreement: "N",
  marketingAgreement: "N",
  privacyAgreement: "N"
}

export const userState = atom<DataStateType<User>>({
  key: "account/user/userState",
  default: {
    data: defaultUser,
    loading: false
  }
});

export const userErrorMap: UserErrorMap = {
  SIGNUP_FAILED: {
    name: "SIGNUP_FAILED",
    message: "회원가입에 실패하였습니다."
  },
  UNCHECKED_ESSENCIAL_AGREEMENT: {
    name: "UNCHECKED_ESSENCIAL_AGREEMENT",
    message: "필수 항목을 체크해주세요"
  },
  NO_NAME: {
    name: "NO_NAME",
    message: "이름을 입력해주세요"
  },
  NO_SCHOOL_YEAR: {
    name: "NO_SCHOOL_YEAR",
    message: "학년을 선택해주세요"
  },
  NO_SUBJECT_CATEGORY: {
    name: "NO_SUBJECT_CATEGORY",
    message: "계열을 선택해주세요"
  },
  EXISTED_USER: {
    name: "EXISTED_USER",
    message: "이미 존재하는 유저입니다."
  }
}

export const userExceptionMap: UserExceptionMap = {
  INVALID_EMAIL: {
    name: "INVALID_EMAIL",
    message: "이메일 형식이 올바르지 않습니다."
  },
  INVALID_PASSWORD: {
    name: "INVALID_PASSWORD",
    message: "영문/숫자/특수문자를 포함 8~32자로 입력해주세요."
  },
  INVALID_PASSWORD_CONFIRM: {
    name: "INVALID_PASSWORD_CONFIRM",
    message: "비밀번호가 일치하지 않습니다."
  }
}
