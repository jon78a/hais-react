import { createContext } from "react";

export type ModalContextState = "UPDATE" | "CREATE" | null;

export const ModalContext = createContext<ModalContextState>(null);
