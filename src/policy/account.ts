import { Agreement } from "../schema/type/Signup";

export const hasCheckedEssentialAgreement = (agreement: Agreement) => (
  agreement.isAgreePrivacy &&
  agreement.isAgreeService
);

export const NAME_REGEX = /^[가-힣]+$/;
export const PASSWORD_MAX_LENGTH = 20;
export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
