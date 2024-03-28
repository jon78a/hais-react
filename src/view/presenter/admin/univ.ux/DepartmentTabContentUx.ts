import { DepartmentCreateDialogUx } from "./DepartmentCreateDialogUx";
import { DepartmentDeleteDialogUx } from "./DepartmentDeleteDialogUx";
import { DepartmentDetailDialogUx } from "./DepartmentDetailDialogUx";
import { DepartmentGuidelineDialogUx } from "./DepartmentGuidelineDialogUx";
import { DepartmentTableUx } from "./DepartmentTableUx";

export interface DepartmentTabContentUx
  extends DepartmentTableUx,
    DepartmentCreateDialogUx,
    DepartmentDeleteDialogUx,
    DepartmentDetailDialogUx,
    DepartmentGuidelineDialogUx {}
