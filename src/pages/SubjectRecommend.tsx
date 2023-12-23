import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SubjectRecommendInteractor from "../view/interactor/SubjectRecommendInteractor";
import majorRepository from "../driver/repository/majorRepository";
import univRepository from "../driver/repository/univRepository";
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

import Alert from "../Alert";
import { useRecoilValue } from "recoil";
import { accountState } from "../schema/states/Account";

const SubjectRecommendPage = (): JSX.Element => {
  const account = useRecoilValue(accountState);

  const [hasScore, setHasScore] = useState<boolean | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (!account) { return }
    studentRepository.findByUser(account.userId)
      .then((student) => {
        Promise.all([
          gradeScoreRepository.findByStudent(student.id),
          commonSubjectRepository.findBy({
            nameKeyword: ''
          })
        ])
          .then((value) => {
            const [scores, subjects] = value;
            setHasScore(scores.length >= subjects.length);
          });
      });
  }, [account]);

  const handleScoreClose = () => {
    setHasScore(undefined);
    navigate(routes.myScore.path);
  }

  if (typeof hasScore === 'undefined') {
    return <></>;
  }

  return hasScore ? (
    <SubjectRecommendContainer
      repositories={{
        majorRepository,
        univRepository,
        optionalSubjectRepository,
        authSessionRepository,
        studentRepository,
        gradeScoreWeightRepository,
        gradeScoreRepository,
        creditScoreRepository,
        commonSubjectWeightRepository,
        commonSubjectRepository,
      }}
    >
      <SubjectRecommendInteractor />
    </SubjectRecommendContainer>
  ) : <Alert open={true} onClose={handleScoreClose} message="공통과목 성적을 등록해주세요."/>;
};

export default SubjectRecommendPage;
