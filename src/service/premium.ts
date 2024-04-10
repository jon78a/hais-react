import { createContext, useContext } from "react";
import { MyPremiumInfoDTO } from "../schema/types/MyPremium";
import { MyPremiumInfo } from "../domain/premium/premium.interface";

interface MyPremiumService {
  save({ form, id }: { form: MyPremiumInfoDTO; id: string }): void;
  get(id: string): Promise<MyPremiumInfo>;
}

export const MyPremiumContext = createContext<MyPremiumService | undefined>(
  undefined
);

export const useMyPremiumService = () => useContext(MyPremiumContext)!;
