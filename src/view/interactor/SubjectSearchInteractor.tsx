import { useRecoilState, useSetRecoilState } from "recoil";
import { useState } from "react";
import { debounce } from "lodash";

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

  //추가한 부분!
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <MajorSearchFilter
        inputUnivKeyword={debounce((value) => {
          setUnivKeyword(value);
          service.showUnivs(value)
            .then((names) => {
              setUnivNames(names);
            });
        }, 1000)}
        inputMajorKeyword={debounce((value) => {
          setMajorKeyword(value);
          service.showMajors(value, univChoice)
            .then((names) => {
              setMajorNames(names);
            })
        }, 1000)}
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
        clickSearchButton={() => { 
          majorChoice && setShowTable(true);
          console.log(univChoice)
        }}
      />
      {showTable &&
      <>
        <p>검색된 대학(Univ): {univChoice}</p>
        <p>검색된 학과(Major): {majorChoice}</p>
        <SearchTable />
      </>}
    </>
  );
}

export default SubjectSearchInteractor;
