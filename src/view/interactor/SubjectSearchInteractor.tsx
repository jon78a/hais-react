import MajorSearchFilter from "../presenter/subject-search.ui/MajorSearchFilter";

const SubjectSearchInteractor = () => {
  return (
    <>
      <MajorSearchFilter
        inputUnivKeyword={(value) => {}}
        inputMajorKeyword={(value) => {}}
        inputGeneralMajorKeyword={(value) => {}}
        clickClsfChoices={(choice) => {}}
        checkMajorNameChoices={(choices) => {}}
        clickSearchButton={() => {}}
      />
    </>
  );
}

export default SubjectSearchInteractor;
