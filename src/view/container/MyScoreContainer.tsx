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
import studentRepository from "../../driver/repository/studentRepository";
import Alert from "../../Alert";
import { routes } from "../../routes";

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
  };
}) => {
  const [errorState, dispatchError] = useReducer(errorReducer, {
    isError: false,
  });

  const {
    commonSubjectRepository,
    optionalSubjectRepository,
    gradeScoreRepository,
    creditScoreRepository,
    authSessionRepository,
  } = repositories;

  return (
    <MyScoreContext.Provider
      value={{
        async saveCreditScore(form) {
          const session = await authSessionRepository.find();
          const userId = session?.userId;
          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return;
          }
          try {
            const { id: studentId } = await studentRepository.findByUser(
              userId
            );
            await creditScoreRepository.save({
              ...form,
              studentId,
              creditAmount: parseInt(form.creditAmount)
            });
          } catch {
            dispatchError({ type: "MODIFY" });
          }
        },
        async saveGradeScore(form) {
          const session = await authSessionRepository.find();
          const userId = session?.userId;
          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return;
          }
          try {
            const { id: studentId } = await studentRepository.findByUser(
              userId
            );
            await gradeScoreRepository.save({
              ...form,
              studentId,
            });
          } catch {
            dispatchError({ type: "MODIFY" });
          }
        },
        async updateCreditScore(form, scoreId) {
          const session = await authSessionRepository.find();
          const userId = session?.userId;
          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return;
          }
          try {
            const { id: studentId } = await studentRepository.findByUser(
              userId
            );
            await creditScoreRepository.save(
              {
                ...form,
                studentId,
                creditAmount: parseInt(form.creditAmount)
              },
              scoreId
            );
          } catch {
            dispatchError({ type: "MODIFY" });
          }
        },
        async updateGradeScore(form, scoreId) {
          const session = await authSessionRepository.find();
          const userId = session?.userId;
          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return;
          }
          try {
            const { id: studentId } = await studentRepository.findByUser(
              userId
            );
            await gradeScoreRepository.save(
              {
                ...form,
                studentId,
              },
              scoreId
            );
          } catch {
            dispatchError({ type: "MODIFY" });
          }
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
                name: payload.name
              }
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
                name: payload.name
              }
            });
          }
          return [];
        },
        async readCreditScoreList() {
          const session = await authSessionRepository.find();
          const userId = session?.userId!;

          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return [];
          }

          const { id: studentId } = await studentRepository.findByUser(
            userId
          );
          const data = await creditScoreRepository.findByStudent(studentId);
          return data.map((score) => {
            return {
              id: score.id,
              code: score.subjectCode,
              value: score.credit,
              creditAmount: score.creditAmount.toString()
            }
          });
        },
        async readGradeScoreList() {
          const session = await authSessionRepository.find();
          const userId = session?.userId!;

          if (!userId) {
            dispatchError({ type: "PERMISSION" });
            return [];
          }

          const { id: studentId } = await studentRepository.findByUser(
            userId
          );
          const data = await gradeScoreRepository.findByStudent(studentId);
          return data.map((score) => {
            return {
              id: score.id,
              code: score.subjectCode,
              value: score.grade
            }
          });
        },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            marginTop: 5
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
