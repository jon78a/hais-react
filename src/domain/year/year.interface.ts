export interface YearRepository {
  getCredit: (year: string) => Promise<number | null>;
}
