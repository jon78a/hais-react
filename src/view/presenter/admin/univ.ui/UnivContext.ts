import { createContext } from "react";
import { Univ } from "../../../../domain/univ/univ.interface";

export type ModalState = "CREATE" | "UPDATE" | "DELETE" | null;

export const TableContext = createContext<{
  modal: {
    state: ModalState;
    set: (value: ModalState) => void;
  };
  selection: {
    state: Univ | null;
    set: (value: Univ) => void;
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
