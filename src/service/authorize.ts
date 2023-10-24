import { createContext, useContext } from "react";

interface AuthorizeService {
  isLogined: () => Promise<boolean>;
  terminateSession: () => Promise<void>;
  isAdmin: () => Promise<boolean>;
}

export const AuthorizeContext = createContext<AuthorizeService | undefined>(undefined);

export const useAuthorizeService = () => useContext(AuthorizeContext)!;
