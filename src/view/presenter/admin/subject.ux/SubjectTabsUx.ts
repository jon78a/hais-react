import type { SubjectDistinct } from "../../../../schema/types/AdminSubject"

export interface SubjectTabsUx {
  clickTab: (value: SubjectDistinct) => void;
}
