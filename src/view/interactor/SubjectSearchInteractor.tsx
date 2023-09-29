import { useRecoilState, useSetRecoilState } from "recoil";
import { useState } from "react";
import { debounce } from "lodash";

import MajorSearchFilter from "../presenter/subject-search.ui/MajorSearchFilter";
import SearchTable from "../presenter/subject-search.ui/SearchTable";
import { useSubjectSearchService } from "../../service/subject-search";
import {
  majorKeywordState,
  univKeywordState,
  univChoiceState,
  majorChoiceState,
  univChoiceListState,
  majorChoiceListState,
  searchSummaryListState
} from "../../schema/states/SubjectSearch";

const SubjectSearchInteractor = () => {
  const service = useSubjectSearchService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);

  const [univChoice, setUnivChoice] = useRecoilState(univChoiceState);
  const [majorChoice, setMajorChoice] = useRecoilState(majorChoiceState);

  const setUnivChoiceList = useSetRecoilState(univChoiceListState);
  const setMajorChoiceList = useSetRecoilState(majorChoiceListState);
  const setSearchSummaryList = useSetRecoilState(searchSummaryListState);

  //추가한 부분!
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <MajorSearchFilter
        inputUnivKeyword={debounce((value) => {
          setUnivKeyword(value);
          service.showUnivs(value)
            .then((choices) => {
              setUnivChoiceList(choices);
            });
        }, 1000)}
        inputMajorKeyword={debounce((value) => {
          setMajorKeyword(value);
          service.showMajors(value, univChoice.name)
            .then((choices) => {
              setMajorChoiceList(choices);
            });
        }, 1000)}
        selectUnivChoice={(value) => {
          setUnivChoice(value);
          service.showMajors("", value.name)
            .then((choices) => {
              setMajorChoiceList(choices);
            });
        }}
        selectMajorChoice={(value) => {
          setMajorChoice(value);
        }}
        deleteUnivChoice={() => {
          setUnivChoiceList([]);
          setMajorChoiceList([]);
        }}
        deleteMajorChoice={() => {
          setMajorChoiceList([]);
        }}
        inputGeneralMajorKeyword={(value) => {}}
        clickClsfChoices={(choice) => {}}
        checkMajorNameChoices={(choices) => {}}
        clickSearchButton={() => { 
          setShowTable(true);
          service.search({
            univToMajor: {
              univChoice: univChoice,
              majorChoice: majorChoice
            }
          }).then((data) => setSearchSummaryList(data));
        }}
      />
      {showTable &&
      <>
        <p>검색된 대학(Univ): {univChoice.name}</p>
        <p>검색된 학과(Major): {majorChoice.name}</p>
        <SearchTable />
      </>}
    </>
  );
}

export default SubjectSearchInteractor;
