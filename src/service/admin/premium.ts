import { createContext, useContext } from "react";

interface AdminPremiumService {}

export const AdminPremiumContext = createContext<
  AdminPremiumService | undefined
>(undefined);

export const useAdminPremiumService = () => useContext(AdminPremiumContext)!;
