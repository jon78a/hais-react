import { SchoolCreateDialogUx } from "./SchoolCreateDialogUx";
import { SchoolDeleteDialogUx } from "./SchoolDeleteDialogUx";
import { SchoolDetailDialogUx } from "./SchoolDetailDialogUx";
import { SchoolFloatButtonUx } from "./SchoolFloatButtonUx";
import { SchoolTableUx } from "./SchoolTableUx";

export interface SchoolTabContentUx
  extends SchoolTableUx,
    SchoolCreateDialogUx,
    SchoolDeleteDialogUx,
    SchoolDetailDialogUx,
    SchoolFloatButtonUx {}
