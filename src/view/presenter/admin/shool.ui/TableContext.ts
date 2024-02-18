import { createContext } from "react";

export type ModalState = "CREATE" | "UPDATE" | "DELETE" | null;

export const TableContext = createContext<{
  modal: {
    state: ModalState;
    set: (value: ModalState) => void;
  };
  selections: {
    state: string[];
    set: (value: string[]) => void;
  };
}>({
  modal: {
    state: null,
    set: (value) => {},
  },
  selections: {
    state: [],
    set: (value) => {},
  },
});
