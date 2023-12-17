export type RequiredCredit = {
  subjectCategory: string[];
  amount: number;
};

export const REQUIRED_CREDITS: RequiredCredit[] = [
  {
    subjectCategory: ['일반선택'],
    amount: 50
  },
  {
    subjectCategory: ['진로선택'],
    amount: 30
  },
  {
    subjectCategory: ['융합선택', '전문교과Ⅰ', '전문교과Ⅱ'],
    amount: 10
  }
];

Object.freeze(REQUIRED_CREDITS);
