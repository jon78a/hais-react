import { useReducer } from "react";

import { MyScoreContext } from "../../service/my-score";
import {
  CommonSubjectRepository,
  CreditScoreRepository,
  GradeScoreRepository,
  OptionalSubjectRepository,
  StudentRepository,
} from "../../domain/subject/school.interface";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AuthSessionRepository } from "../../domain/account/auth.interface";
import Alert from "../../Alert";
import { routes } from "../../routes";
import { SchoolRepository } from "../../domain/school/school.interface";

type ErrorType = "PERMISSION" | "MODIFY";

interface ErrorState {
  isError: boolean;
  errorMessage?: string;
  errorCallback?: () => void;
}

interface ErrorAction {
  type: ErrorType;
}

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  const { type } = action;
  switch (type) {
    case "PERMISSION":
      return {
        isError: true,
        errorMessage: "로그인이 필요합니다. 로그인 페이지로 이동합니다.",
        errorCallback: () => {
          window.location.replace(routes.login.path);
        },
      };
    case "MODIFY":
      return {
        isError: true,
        errorMessage: "저장에 실패하였습니다.",
      };
    default:
      return state;
  }
};

const MyScoreContainer = ({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories: {
    commonSubjectRepository: CommonSubjectRepository;
    optionalSubjectRepository: OptionalSubjectRepository;
    gradeScoreRepository: GradeScoreRepository;
    creditScoreRepository: CreditScoreRepository;
    authSessionRepository: AuthSessionRepository;
    studentRepository: StudentRepository;
    schoolRepository: SchoolRepository;
  };
}) => {
  const [errorState, dispatchError] = useReducer(errorReducer, {
    isError: false,
  });

  const {
    commonSubjectRepository,
    optionalSubjectRepository,
    authSessionRepository,
    schoolRepository,
    studentRepository,
  } = repositories;

  return (
    <MyScoreContext.Provider
      value={{
        async getSubjectGrade(studentId: string, isCommonSubject?: boolean) {
          const grade = await studentRepository.getSubjectGrade(
            studentId,
            isCommonSubject
          );
          return grade;
        },
        async getStudent() {
          const session = await authSessionRepository.find();
          const userId = session?.userId;
          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return;
          }
          const student = await studentRepository.findByUser(userId);
          return student;
        },
        async getSchoolList() {
          const schools = await schoolRepository.findBy({ nameKeyword: "" });
          return schools;
        },
        async saveMySchool(schoolId) {
          const session = await authSessionRepository.find();
          const userId = session?.userId;
          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return;
          }
          try {
            const student = await studentRepository.findByUser(userId);
            await studentRepository.update(student.id, { schoolId });
          } catch {
            dispatchError({ type: "MODIFY" });
          }
        },
        async saveGradeScore(studentId, isCommonSubject, form) {
          const session = await authSessionRepository.find();
          const userId = session?.userId;
          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return;
          }
          try {
            await studentRepository.updateSubjectScore(
              studentId,
              isCommonSubject,
              form
            );
          } catch {
            dispatchError({ type: "MODIFY" });
          }
        },
        async getCommonSubjects() {
          const data = await schoolRepository.getCommonSubjects();
          return data;
        },
        async getOptionalSubjects(schoolId) {
          const data = await schoolRepository.getOptionalSubjects(schoolId);
          return data;
        },
        async showSubjectSummaryList(label) {
          if (label === "공통과목") {
            const data = await commonSubjectRepository.findBy({
              nameKeyword: "",
            });

            return data.map((payload) => {
              return {
                code: payload.code,
                group: payload.group,
                subjectCategory: label,
                name: payload.name,
              };
            });
          }
          if (label === "선택과목") {
            const data = await optionalSubjectRepository.findBy({
              nameKeyword: "",
            });

            return data.map((payload) => {
              return {
                code: payload.code,
                group: payload.group,
                subjectCategory: payload.subjectCategory,
                name: payload.name,
              };
            });
          }
          return [];
        },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            marginTop: 5,
          }}
        >
          교과 성적 입력
        </Typography>
        {children}
      </Container>
      <Alert
        open={errorState.isError}
        onClose={() => errorState.errorCallback && errorState.errorCallback()}
        message={errorState.errorMessage}
      />
    </MyScoreContext.Provider>
  );
};

export default MyScoreContainer;
