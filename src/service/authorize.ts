import { createContext, useContext } from "react";

interface AuthorizeService {
  isLogined: () => boolean;
  terminateSession: () => void;
}

export const AuthorizeContext = createContext<AuthorizeService | undefined>(undefined);

export const useAuthorizeService = () => useContext(AuthorizeContext)!;
