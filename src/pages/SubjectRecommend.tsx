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

const SubjectRecommendPage = (): JSX.Element => {
  return (
    <SubjectRecommendContainer
      repositories={{
        majorRepository,
        univRepository,
        optionalSubjectRepository,
        authSessionRepository,
        studentRepository,
        gradeScoreWeightRepository,
        gradeScoreRepository,
        commonSubjectWeightRepository,
        commonSubjectRepository,
      }}
    >
      <SubjectRecommendInteractor />
    </SubjectRecommendContainer>
  );
};

export default SubjectRecommendPage;
