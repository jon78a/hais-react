import SubjectSearchInteractor from "../view/interactor/SubjectSearchInteractor";
import SubjectSearchContainer from "../view/container/SubjectSearchContainer";

const SubjectSearchPage = (): JSX.Element => {
  return (
    <SubjectSearchContainer repositories={[]}>
      <SubjectSearchInteractor />
    </SubjectSearchContainer>
  );
}

export default SubjectSearchPage;
