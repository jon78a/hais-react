import { atom } from "recoil";
import { MyPremiumInfo } from "../../domain/premium/premium.interface";

export const premiumState = atom<MyPremiumInfo | undefined>({
  key: "schema/states/premium",
  default: undefined,
});
