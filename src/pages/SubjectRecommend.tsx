import SubjectRecommendInteractor from "../view/interactor/SubjectRecommendInteractor";
import SubjectSearchContainer from "../view/container/SubjectSearchContainer";
import majorRepository from "../driver/repository/majorRepository";
import univRepository from "../driver/repository/univRepository";
import optionalSubjectRepository from "../driver/repository/optionalSubjectRepository";

const SubjectRecommendPage = (): JSX.Element => {
  return (
    <SubjectSearchContainer repositories={{
      majorRepository,
      univRepository,
      optionalSubjectRepository
    }}>
      <SubjectRecommendInteractor />
    </SubjectSearchContainer>
  );
}

export default SubjectRecommendPage;
