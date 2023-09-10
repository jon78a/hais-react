export interface Major {
    id: number;
    univ: string;
    college: string;
    investigationYear: string;
    sidoCode: string;
}

export interface TargetMajor {
    id: number;
    studentId: string;
    majorId: number;
    isActive: boolean;
}
