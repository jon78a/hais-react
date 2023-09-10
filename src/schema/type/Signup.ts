import type { AuthType } from "../../policy/auth";

export type Agreement = {
    isAgreeMarketing: boolean;
    isAgreeService: boolean;
    isAgreePrivacy: boolean;
}

export enum GradeEnum {
    FIRST = 1,
    SECOND,
    THIRD
}

export type StudentProfile = {
    name: string;
    grade: GradeEnum;
    targetMajor: number[];
}

export type UserCredentialForm = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export type OAuth = {
    code: string;
    authType: AuthType;
}

export type AuthPayload = {
    email?: string;
}
