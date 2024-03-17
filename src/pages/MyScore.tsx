import MyScoreContainer from "../view/container/MyScoreContainer";
import MyScoreInteractor from "../view/interactor/MyScoreInteractor";

import authSessionRepository from "../driver/repository/authSessionRepository";
import commonSubjectRepository from "../driver/repository/commonSubjectRepository";
import optionalSubjectRepository from "../driver/repository/optionalSubjectRepository";
import studentRepository from "../driver/repository/studentRepository";
import gradeScoreRepository from "../driver/repository/gradeScoreRepository";
import creditScoreRepository from "../driver/repository/creditScoreRepository";
import schoolRepository from "../driver/repository/schoolRepository";

const MyScorePage = () => {
  return (
    <MyScoreContainer
      repositories={{
        authSessionRepository,
        commonSubjectRepository,
        optionalSubjectRepository,
        studentRepository,
        gradeScoreRepository,
        creditScoreRepository,
        schoolRepository,
      }}
    >
      <MyScoreInteractor />
    </MyScoreContainer>
  );
};

export default MyScorePage;
