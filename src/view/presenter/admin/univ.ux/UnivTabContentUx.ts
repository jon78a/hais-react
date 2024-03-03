import { UnivCreateDialogUx } from "./UnivCreateDialogUx";
import { UnivDeleteDialogUx } from "./UnivDeleteDialogUx";
import { UnivDetailDialogUx } from "./UnivDetailDialogUx";
import { UnivTableUx } from "./UnivTableUx";

export interface UnivTabContentUx
  extends UnivTableUx,
    UnivCreateDialogUx,
    UnivDeleteDialogUx,
    UnivDetailDialogUx {}
