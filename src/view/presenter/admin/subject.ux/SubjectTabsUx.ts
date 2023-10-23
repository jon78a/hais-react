import type { SubjectDistinct } from "../../../../schema/types/SubjectTable"

export interface SubjectTabsUx {
  clickTab: (value: SubjectDistinct) => void;
}
