import {
  MajorRepository,
  UnivRepository,
} from "../../domain/subject/univ.interface";
import { CommonSubjectRepository, CommonSubjectWeightRepository, GradeScoreRepository, GradeScoreWeightRepository, OptionalSubjectRepository, StudentRepository } from "../../domain/subject/school.interface";
import { SubjectRecommendContext } from "../../service/subject-recommend";
import { AuthSessionRepository } from "../../domain/account/auth.interface";
import type { Comparison, SubjectData } from "../../schema/types/SubjectRecommend";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const SubjectRecommendContainer = ({
  children,
  repositories,
}: {
  children?: React.ReactNode;
  repositories: {
    majorRepository: MajorRepository
    univRepository: UnivRepository;
    optionalSubjectRepository: OptionalSubjectRepository;
    authSessionRepository: AuthSessionRepository;
    studentRepository: StudentRepository;
    gradeScoreWeightRepository: GradeScoreWeightRepository;
    commonSubjectWeightRepository: CommonSubjectWeightRepository;
    commonSubjectRepository: CommonSubjectRepository;
    gradeScoreRepository: GradeScoreRepository;
  };
}) => {
  const {
    majorRepository,
    univRepository,
    optionalSubjectRepository,
    authSessionRepository,
    studentRepository,
    gradeScoreWeightRepository,
    gradeScoreRepository,
    commonSubjectRepository,
    commonSubjectWeightRepository
  } = repositories;

  return (
    <SubjectRecommendContext.Provider
      value={{
        async suggestUniv(univKeyword) {
          const univs = await univRepository.findByNameLike(univKeyword);
          return univs.map((univ) => {
            return {
              id: univ.id,
              name: univ.name,
            };
          });
        },
        async searchByUnivOrMajor(fullNameKeyword) {
          const majors = await majorRepository.findByUnivOrMajorName(fullNameKeyword);
          return majors.map((major) => {
            return {
              id: major.id,
              name: major.name,
              univ: major.univ,
              department: major.department,
              requiredCredits: major.requiredCredits.map((v) => ({
                subjectCategory: v.subjectCategory,
                amount: v.amount.toString()
              })),
              requiredGroups: major.requiredGroups,
              difficulty: major.difficulty.toString()
            }
          })
        },
        async searchByMajorKeywordOnUnivName(majorKeyword, univName) {
          const majors = await majorRepository.findByNameLikeWithUniv(majorKeyword, univName);
          return majors.map((major) => {
            return {
              id: major.id,
              name: major.name,
              univ: major.univ,
              department: major.department,
              requiredCredits: major.requiredCredits.map((v) => ({
                subjectCategory: v.subjectCategory,
                amount: v.amount.toString()
              })),
              requiredGroups: major.requiredGroups,
              difficulty: major.difficulty.toString()
            }
          });
        },
        async recommend(subjects) {
          const session = await authSessionRepository.find();
          if (!session) throw Error('세션이 만료되었습니다.');
          
          const userId = session.userId;
          const student = await studentRepository.findByUser(userId);
          const scores = await gradeScoreRepository.findByStudent(student.id);
          const scoreWeights = await gradeScoreWeightRepository.findAll();
          const subjectWeights = await commonSubjectWeightRepository.findAll();
          const commonSubjects = await commonSubjectRepository.findBy({nameKeyword: ''});

          const comparisons: Comparison[] = [];

          let point = 0;
          for (let subject of subjects) {
            const commonSubjectCode = commonSubjects.find((v) => v.group === subject.group)?.code;

            const subjectWeight = subjectWeights.find((weight) => weight.subjectCode === commonSubjectCode);
            const studentScore = scores.find((score) => score.subjectCode === commonSubjectCode);
            const scoreWeight = scoreWeights.find((weight) => weight.scoreType === studentScore?.grade);
            if (!studentScore || !scoreWeight || !subjectWeight) continue;

            point += scoreWeight.weight * subjectWeight.weight * studentScore.grade;

            comparisons.push({
              subjectName: subject.name,
              score: Number(studentScore)
            });
          }

          return {
            status: point,
            comparisons
          }
        },
        async readSubjectList(recruit) {
          const subjects = await optionalSubjectRepository.findBy({nameKeyword: ''});
          const subjectsByGroup = subjects
            .filter(
              (subject) => 
                recruit.requiredGroups.includes(subject.group) &&
                subject.difficulty >= parseInt(recruit.difficulty)
            );

          let categoryCreditBuffer: {[key: string]: number} = {};
          let categoryCreditMap: {[key: string]: number} = {};
          let categorySubjectMap: {[key: string]: SubjectData[]} = {};

          recruit.requiredCredits.forEach((item) => {
            categoryCreditBuffer[item.subjectCategory] = 0;
            categoryCreditMap[item.subjectCategory] = parseInt(item.amount);
          });

          subjectsByGroup.sort(() => Math.random() - 0.5);  // shuffle array
          subjectsByGroup.forEach((subject) => {
            const category = subject.subjectCategory;
            const creditAmount = subject.creditAmount;

            const totalAmount = categoryCreditMap[category];
            const currAmount = categoryCreditBuffer[category];

            if (currAmount + creditAmount > totalAmount) {
              return;
            }

            categoryCreditBuffer[category] += creditAmount;
            categorySubjectMap[category] = (categorySubjectMap[category] ?? []).concat({...subject});
          });

          return ([] as SubjectData[]).concat(...Object.values(categorySubjectMap));
        },
      }}
    >
      <Container maxWidth={"md"} component={Paper}>
        {children}
      </Container>
    </SubjectRecommendContext.Provider>
  );
};

export default SubjectRecommendContainer;
