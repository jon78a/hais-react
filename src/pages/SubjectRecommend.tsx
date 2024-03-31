import { useEffect } from "react";

import SubjectRecommendInteractor from "../view/interactor/SubjectRecommendInteractor";
import majorRepository from "../driver/repository/majorRepository";
import univRepository from "../driver/repository/v2/univRepository";
import optionalSubjectRepository from "../driver/repository/optionalSubjectRepository";
import authSessionRepository from "../driver/repository/authSessionRepository";
import studentRepository from "../driver/repository/studentRepository";
import gradeScoreWeightRepository from "../driver/repository/gradeScoreWeightRepository";
import gradeScoreRepository from "../driver/repository/gradeScoreRepository";
import commonSubjectWeightRepository from "../driver/repository/commonSubjectWeightRepository";
import SubjectRecommendContainer from "../view/container/SubjectRecommendContainer";
import commonSubjectRepository from "../driver/repository/commonSubjectRepository";
import creditScoreRepository from "../driver/repository/creditScoreRepository";
import { routes } from "../routes";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accountState } from "../schema/states/Account";
import departmentRepository from "../driver/repository/v2/departmentRepository";
import schoolRepository from "../driver/repository/schoolRepository";
import {
  studentCommonSubjectScoreState,
  studentOptionalSubjectScoreState,
} from "../schema/states/SubjectRecommend";
import userRepository from "../driver/repository/userRepository";
import yearRepository from "../driver/repository/yearRepository";
import { creditState } from "../schema/states/Year";
import { studentState } from "../schema/states/MyScore";

const SubjectRecommendPage = (): JSX.Element => {
  const [account, setAccount] = useRecoilState(accountState);
  const setCommonSubjectScore = useSetRecoilState(
    studentCommonSubjectScoreState
  );
  const setOptionalCommonSubjectScore = useSetRecoilState(
    studentOptionalSubjectScoreState
  );
  const setStudent = useSetRecoilState(studentState);
  const setCredit = useSetRecoilState(creditState);

  useEffect(() => {
    authSessionRepository.find().then((session) => {
      const current = Math.floor(Date.now() / 1000);

      if (!!session && session.exp > current && session.status === "GRANT") {
        const currentYear = new Date().getFullYear().toString();
        Promise.all([
          userRepository.findByUserId(session.userId),
          yearRepository.getCredit(currentYear),
        ]).then(([user, credit]) => {
          if (user) {
            setAccount({
              userId: user.id,
              activated: user.activated,
              verified: user.verified,
              isAdmin: user.isAdmin,
            });
          }
          if (credit) {
            setCredit(credit);
          }
        });
      }
    });
  }, [setAccount, setCredit]);

  useEffect(() => {
    // 로그인 상태인 경우
    if (!account) return;

    studentRepository.findByUser(account?.userId).then((student) => {
      if (!student.schoolId) {
        // if (window.confirm("학교를 선택해주세요.")) {
        //   window.location.replace(routes.my.path);
        // }
        return;
      }

      setStudent(student);

      Promise.all([
        studentRepository.getSubjectGrade(student.id, true),
        studentRepository.getSubjectGrade(student.id, false),
      ]).then((value) => {
        const [commonSubjectScores, optionalSubjectsScores] = value;
        setCommonSubjectScore(commonSubjectScores);
        setOptionalCommonSubjectScore(optionalSubjectsScores);
      });
    });
  }, [
    account,
    setCommonSubjectScore,
    setOptionalCommonSubjectScore,
    setStudent,
  ]);

  return (
    <SubjectRecommendContainer
      repositories={{
        majorRepository,
        departmentRepository,
        univRepository,
        optionalSubjectRepository,
        authSessionRepository,
        studentRepository,
        gradeScoreWeightRepository,
        gradeScoreRepository,
        creditScoreRepository,
        commonSubjectWeightRepository,
        commonSubjectRepository,
        schoolRepository,
      }}
    >
      <SubjectRecommendInteractor />
    </SubjectRecommendContainer>
  );
};

export default SubjectRecommendPage;
