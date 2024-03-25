import { atom } from "recoil";

export const creditState = atom<number>({
  key: "schema/states/year/credit",
  default: 0,
});
