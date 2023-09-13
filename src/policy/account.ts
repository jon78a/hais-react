import { Agreement } from "../schema/type/Signup"

export const hasCheckedEssentialAgreement = (agreement: Agreement) => (
    agreement.isAgreePrivacy &&
    agreement.isAgreeService
);

export const NAME_REGEX = /^[가-힣]+$/;
