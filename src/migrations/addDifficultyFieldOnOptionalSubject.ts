import optionalSubjectRepository from "../driver/repository/optionalSubjectRepository";

export default async function addDifficultyFieldOnOptionalSubject() {
  const subjects = await optionalSubjectRepository.findBy({nameKeyword: ''});
  for (const subject of subjects) {
    await optionalSubjectRepository.save({
      ...subject,
      difficulty: 7
    }, subject.code);
  }
}
