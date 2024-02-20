import { SchoolCreateDialogUx } from "./SchoolCreateDialogUx";
import { SchoolDeleteDialogUx } from "./SchoolDeleteDialogUx";
import { SchoolDetailDialogUx } from "./SchoolDetailDialogUx";
import { SchoolTableUx } from "./SchoolTableUx";

export interface SchoolTabContentUx
  extends SchoolTableUx,
    SchoolCreateDialogUx,
    SchoolDeleteDialogUx,
    SchoolDetailDialogUx {}
