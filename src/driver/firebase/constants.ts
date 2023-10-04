export class CollectionName {
  static User = "users";
  static Student = "students";
  static AuthSession = "auth_session";
}

export class StorageSource {
  static GeneralMajor = "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/generalMajor.json?alt=media&token=d74e42a9-cace-4c18-ac4e-b1501590ee78";
  static Major = "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/major.json?alt=media&token=a966858e-023f-4986-8756-929688f30b23";
  static MajorCategoryGroup = "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/majorCategoryGroup.json?alt=media&token=2bd327d1-4c0e-4c7c-8336-291ef09fa303";
  static OptionalSubject = "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/optionalSubject.json?alt=media&token=88e3798b-3f7d-4534-9b99-d5655fb89646";
  static RecommendGroup = "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/recommendGroup.json?alt=media&token=a0b53268-3e90-4236-b25b-a0178d289c47";
  static Univ = "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/univ.json?alt=media&token=216969cb-0f37-4dec-b722-a473221cc5b1";
}

export class ErrorStatus {
  // accounts
  static USER_NOT_FOUND = "유저를 찾을 수 없습니다.";
  static VERIFIED_USER = "이미 인증된 유저입니다.";
  static NOT_VERIFIED_USER = "이메일이 인증되지 않은 유저 양식입니다";
  static DIFFERENT_EMAIL = "전송할 이메일이 인증할 이메일과 다릅니다";
  static UNSUBMIT_CREDENTIAL = "인증 양식을 먼저 제출해주세요";
  static USER_SESSION_OUT = "서비스를 이용할 수 없습니다. 다시 로그인 해주세요";
  static PERMISSION_ERROR = "권한이 없습니다.";
  static INVALID_USER_EMAIL = "등록된 이메일이 없습니다.";
  static INVALID_USER_PASSWORD = "비밀번호가 올바르지 않습니다.";
  static USER_INACTIVE = "이미 탈퇴한 유저입니다."
}
