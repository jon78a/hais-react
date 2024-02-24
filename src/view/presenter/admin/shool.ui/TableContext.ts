import { createContext } from "react";
import { School } from "../../../../domain/school/school.interface";

export type ModalState = "CREATE" | "UPDATE" | "DELETE" | null;

export const TableContext = createContext<{
  modal: {
    state: ModalState;
    set: (value: ModalState) => void;
  };
  selection: {
    state: School | null;
    set: (value: School) => void;
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
