import { atom } from "recoil";
import type { User } from "../types/User";

export const userState = atom<User | null>({
  key: "schema/states/User",
  default: null,
});
