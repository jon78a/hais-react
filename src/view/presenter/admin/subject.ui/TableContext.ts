import { createContext } from "react";

export type ModalState = "UPDATE" | "CREATE" | "DELETE" | null;

export const TableContext = createContext<{
  modal: {
    state: ModalState;
    set: (value: ModalState) => void;
  },
  selections: {
    state: number[];
    set: (value: number[]) => void;
  }
}>({
  modal: {
    state: null,
    set: (value) => {}
  },
  selections: {
    state: [],
    set: (value) => {}
  }
});
