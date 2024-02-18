import { SchoolTabItem } from "../../../../schema/types/AdminSchool";

export interface SchoolTabsUx {
  clickTab: (value: SchoolTabItem) => void;
}
