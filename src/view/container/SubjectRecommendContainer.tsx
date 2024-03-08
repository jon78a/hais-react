import { MajorRepository } from "../../domain/subject/univ.interface";
import {
  CommonSubjectRepository,
  CommonSubjectWeightRepository,
  CreditScoreRepository,
  GradeScoreRepository,
  GradeScoreWeightRepository,
  OptionalSubjectRepository,
  StudentRepository,
} from "../../domain/subject/school.interface";
import { SubjectRecommendContext } from "../../service/subject-recommend";
import { AuthSessionRepository } from "../../domain/account/auth.interface";
import type { Comparison } from "../../schema/types/SubjectRecommend";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {
  DepartmentRepository,
  UnivRepository,
} from "../../domain/univ/univ.interface";
import { SchoolRepository } from "../../domain/school/school.interface";

const SubjectRecommendContainer = ({
  children,
  repositories,
}: {
  children?: React.ReactNode;
  repositories: {
    majorRepository: MajorRepository;
    departmentRepository: DepartmentRepository;
    univRepository: UnivRepository;
    optionalSubjectRepository: OptionalSubjectRepository;
    authSessionRepository: AuthSessionRepository;
    studentRepository: StudentRepository;
    gradeScoreWeightRepository: GradeScoreWeightRepository;
    commonSubjectWeightRepository: CommonSubjectWeightRepository;
    commonSubjectRepository: CommonSubjectRepository;
    gradeScoreRepository: GradeScoreRepository;
    creditScoreRepository: CreditScoreRepository;
    schoolRepository: SchoolRepository;
  };
}) => {
  const {
    majorRepository,
    departmentRepository,
    univRepository,
    authSessionRepository,
    studentRepository,
    gradeScoreWeightRepository,
    gradeScoreRepository,
    commonSubjectRepository,
    schoolRepository,
    commonSubjectWeightRepository,
  } = repositories;

  const getStudent = async () => {
    const session = await authSessionRepository.find();
    if (!session) throw Error("세션이 만료되었습니다.");

    const userId = session.userId;
    return await studentRepository.findByUser(userId);
  };

  return (
    <SubjectRecommendContext.Provider
      value={{
        async suggestUniv(nameKeyword) {
          const univs = await univRepository.findBy({ nameKeyword });
          return univs.map((univ) => {
            return {
              id: univ.id,
              name: univ.name,
            };
          });
        },
        async searchByUnivOrMajor(fullNameKeyword) {
          const majors = await majorRepository.findByUnivOrMajorName(
            fullNameKeyword
          );
          return majors.map((major) => {
            return {
              id: major.id,
              name: major.name,
              univ: major.univ,
              department: major.department,
              requiredGroups: major.requiredGroups,
              difficulty: major.difficulty.toString(),
            };
          });
        },
        async getDepartmentOnUniv(name, univId) {
          const departments = await departmentRepository.findByUnivId(
            name,
            univId
          );

          return departments.map((department) => ({
            id: department.id,
            name: department.name,
            precedences: department.precedences,
            keyword: department.keyword,
            guidelines: department.guidelines,
          }));
        },
        async recommend(subjects) {
          const student = await getStudent();
          const scores = await gradeScoreRepository.findByStudent(student.id);
          const scoreWeights = await gradeScoreWeightRepository.findAll();
          const subjectWeights = await commonSubjectWeightRepository.findAll();
          const commonSubjects = await commonSubjectRepository.findBy({
            nameKeyword: "",
          });

          const comparisons: Comparison[] = [];

          let point = 0;
          for (let subject of subjects) {
            const commonSubjectCode = commonSubjects.find(
              (v) => v.group === subject.group
            )?.code;

            const subjectWeight = subjectWeights.find(
              (weight) => weight.subjectCode === commonSubjectCode
            );
            const studentScore = scores.find(
              (score) => score.subjectCode === commonSubjectCode
            );
            const scoreWeight = scoreWeights.find(
              (weight) => weight.scoreType === studentScore?.grade
            );
            if (!studentScore || !scoreWeight || !subjectWeight) continue;

            point +=
              scoreWeight.weight * subjectWeight.weight * studentScore.grade;

            comparisons.push({
              subjectName: subject.name,
              score: Number(studentScore),
            });
          }

          return {
            status: point,
            comparisons,
          };
        },
        async readSubjectList(guidelines) {
          const promises = guidelines.flatMap((g) =>
            (g.options || []).map((option) =>
              schoolRepository.findSubjectById({
                isCommonSubject: g.type === "공통과목",
                subjectId: option,
              })
            )
          );

          return Promise.all(promises).then((results) => results!);
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
