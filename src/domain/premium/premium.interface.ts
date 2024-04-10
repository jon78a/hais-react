import { MyPremiumInfoDTO } from "../../schema/types/MyPremium";

export interface PremiumRepository {
  save: ({
    form,
    id,
  }: {
    form: MyPremiumInfoDTO;
    id: string;
  }) => Promise<{ id: string }>;
  get: (id: string) => Promise<MyPremiumInfo>;
}

export type MyPremiumInfo = {
  academyName?: string;
  logoSrc?: string;
  bannerSrc?: string;
  id?: string;
};
