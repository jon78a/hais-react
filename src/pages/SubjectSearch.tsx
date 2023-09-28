import SubjectSearchInteractor from "../view/interactor/SubjectSearchInteractor";
import SubjectSearchContainer from "../view/container/SubjectSearchContainer";
import majorRepository from "../driver/repository/majorRepository";
import univRepository from "../driver/repository/univRepository";

const SubjectSearchPage = (): JSX.Element => {
  return (
    <SubjectSearchContainer repositories={{
      majorRepository,
      univRepository
    }}>
      <SubjectSearchInteractor />
    </SubjectSearchContainer>
  );
}

export default SubjectSearchPage;
