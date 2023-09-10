import type { AuthType } from "../../policy/auth";
import type { YN } from "../../types"

export interface Student {
    userId: string;
    id: string;
    scoreId: string;
    name: string;
    grade: number;    
}

export interface User {
    id: string;
    email: string;
    password: string;
    authType: AuthType;
    serviceAgreement: YN;
    marketingAgreement: YN;
    privacyAgreement: YN;
}
