// optional_subject 문서에 credit_amount 필드를 일괄 추가합니다.

// import optionalSubjectRepository from "../driver/repository/optionalSubjectRepository";

// export default async function addCreditAmountField() {
//   const DEFAULT_FIELD_VALUE = 0;
//   const subjects = await optionalSubjectRepository.findBy({ nameKeyword: "" });
//   for (const subject of subjects) {
//     await optionalSubjectRepository.save({
//       ...subject,
//       creditAmount: DEFAULT_FIELD_VALUE
//     }, subject.code);
//   }
// }
export {};
