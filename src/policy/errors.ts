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
