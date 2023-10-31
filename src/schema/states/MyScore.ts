import { atom, selector } from "recoil";

import type { SelectedSchoolYear, SubjectLabel } from "../types/MyScore";

export const selectedSchoolYearState = atom<SelectedSchoolYear>({
  key: "schema/states/MyScore/SelectedSchoolYear",
  default: 1
});

export const subjectLabelState = selector<SubjectLabel>({
  key: "schema/states/MyScore/SubjectLabel",
  get: ({get}) => {
    const year = get(selectedSchoolYearState);
    return year === 1 ? "공통과목" : "선택과목";
  }
});
