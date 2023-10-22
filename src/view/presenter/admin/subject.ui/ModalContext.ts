import { createContext } from "react";

export type ModalState = "UPDATE" | "CREATE" | null;

export const ModalContext = createContext<{
  modalState: ModalState,
  setModalState: (value: ModalState) => void
}>({
  modalState: null,
  setModalState: (value) => {}
});
