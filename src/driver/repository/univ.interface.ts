import { Major, TargetMajor } from "../../domain/subject/univ.interface";

export interface MajorRepository {
  findByName: (name: string, isActive?: boolean) => Major[];
  findByUniv: (univ: string, isActive?: boolean) => Major[];
  save: (data: Major) => void;
}

export interface TargetMajorRepository {
  findByStudent: (studentId: string, isActive?: boolean) => TargetMajor[];
}
