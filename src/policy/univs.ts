import { OptionalSubject } from "../domain/subject/school.interface";

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

export function sortByDifficulty(target: number, items: OptionalSubject[]): OptionalSubject[] {
  // items를 leftArr과 rightArr로 분리
  const leftArr = items.filter((value) => value.difficulty <= target).sort((a, b) => b.difficulty - a.difficulty);
  const rightArr = items.filter((value) => value.difficulty > target).sort((a, b) => a.difficulty - b.difficulty);

  // leftArr과 rightArr을 합쳐서 결과 배열 생성
  const resultArr = [...leftArr, ...rightArr];

  return resultArr;
}
