import { atom } from "recoil";
import type { Account } from "../types/Account";

export const accountState = atom<Account | null>({
  key: 'schema/states/Account/User',
  default: null
});
