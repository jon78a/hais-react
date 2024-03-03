import { createContext } from "react";
import { Department } from "../../../../domain/univ/univ.interface";

export type ModalState = "CREATE" | "UPDATE" | "DELETE" | null;

export const DepartmentTableContext = createContext<{
  modal: {
    state: ModalState;
    set: (value: ModalState) => void;
  };
  selection: {
    state: Department | null;
    set: (value: Department) => void;
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
