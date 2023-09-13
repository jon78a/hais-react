import { atom } from "recoil";
import { User, UserErrorMap } from "./user.interface";
import type { DataStateType } from "../../types";

export const defaultUser: User = {
  id: "",
  email: "",
  password: "",
  authType: null,
  activated: false,
  serviceAgreement: "N",
  marketingAgreement: "N",
  privacyAgreement: "N"
}

export const userState = atom<DataStateType<User>>({
  key: "account/user/User",
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
  }
}
