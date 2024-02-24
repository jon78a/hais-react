import { createContext } from "react";
import { SchoolSubject } from "../../../../domain/school/school.interface";

export type ModalState = "CREATE" | "UPDATE" | "DELETE" | null;

export const SchoolSubjectTableContext = createContext<{
  modal: {
    state: ModalState;
    set: (value: ModalState) => void;
  };
  selection: {
    state: SchoolSubject | null;
    set: (value: SchoolSubject) => void;
  };
}>({
  modal: {
    state: null,
    set: (value) => {},
  },
  selection: {
    state: null,
    set: (value) => {},
  },
});
