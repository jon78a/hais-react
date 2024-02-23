import { SchoolSubjectCreateDialogUx } from "./SchoolSubjectCreateDialogUx";
import { SchoolSubjectDeleteDialogUx } from "./SchoolSubjectDeleteDialogUx";
import { SchoolSubjectDetailDialogUx } from "./SchoolSubjectDetailDialogUx";
import { SchoolSubjectTableUx } from "./SchoolSubjectTableUx";

export interface SchoolSubjectTabContentUx
  extends SchoolSubjectTableUx,
    SchoolSubjectCreateDialogUx,
    SchoolSubjectDeleteDialogUx,
    SchoolSubjectDetailDialogUx {}
