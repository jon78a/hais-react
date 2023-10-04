import { createContext, useContext } from "react";

interface AuthorizeService {
  isLogined: () => Promise<boolean>;
  terminateSession: () => Promise<void>;
}

export const AuthorizeContext = createContext<AuthorizeService | undefined>(undefined);

export const useAuthorizeService = () => useContext(AuthorizeContext)!;
