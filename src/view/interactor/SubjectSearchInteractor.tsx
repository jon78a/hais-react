import { useRecoilState, useSetRecoilState } from "recoil";

import MajorSearchFilter from "../presenter/subject-search.ui/MajorSearchFilter";
import SearchTable from "../presenter/subject-search.ui/SearchTable";
import { useSubjectSearchService } from "../../service/subject-search";
import {
  majorKeywordState,
  univKeywordState,
  majorNamesState,
  univNamesState,
  univChoiceState,
  majorChoiceState
} from "../../schema/states/SubjectSearch";

const SubjectSearchInteractor = () => {
  const service = useSubjectSearchService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);

  const setUnivNames = useSetRecoilState(univNamesState);
  const setMajorNames = useSetRecoilState(majorNamesState);

  const [univChoice, setUnivChoice] = useRecoilState(univChoiceState);
  const [majorChoice, setMajorChoice] = useRecoilState(majorChoiceState)

  return (
    <>
      <MajorSearchFilter
        inputUnivKeyword={(value) => {
          setUnivKeyword(value);
          service.showUnivs(value)
            .then((names) => {
              setUnivNames(names);
            });
        }}
        inputMajorKeyword={(value) => {
          setMajorKeyword(value);
          service.showMajors(value, univChoice)
            .then((names) => {
              setMajorNames(names);
            })
        }}
        selectUnivChoice={(value) => {
          setUnivChoice(value);
        }}
        selectMajorChoice={(value) => {
          setMajorChoice(value);
        }}
        deleteUnivChoice={() => {
          setUnivChoice("");
        }}
        deleteMajorChoice={() => {
          setMajorChoice("");
        }}
        inputGeneralMajorKeyword={(value) => {}}
        clickClsfChoices={(choice) => {}}
        checkMajorNameChoices={(choices) => {}}
        clickSearchButton={() => {}}
      />
      <SearchTable />
    </>
  );
}

export default SubjectSearchInteractor;
