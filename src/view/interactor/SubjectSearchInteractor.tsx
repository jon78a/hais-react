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
import { Box, Typography } from "@mui/material";
import { theme } from "../../theme";

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
    <Box sx={{px:"15%"}}>
      <MajorSearchFilter
        inputUnivKeyword={debounce((value) => {
          setUnivKeyword(value);
          service.showUnivs(value)
            .then((choices) => {
              setUnivChoiceList(choices);
            });
        }, 750)}
        inputMajorKeyword={debounce((value) => {
          setMajorKeyword(value);
          service.showMajors(value, univChoice.name)
            .then((choices) => {
              setMajorChoiceList(choices);
            });
        }, 750)}
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
          majorChoice && setShowTable(true);
          service.search({
            univToMajor: {
              univChoice: univChoice,
              majorChoice: majorChoice
            }
          }).then((data) => setSearchSummaryList(data));
        }}
      />
      {showTable && (
        <>
          <p>검색된 대학(Univ): {univChoice.name}</p>
          <p>검색된 학과(Major): {majorChoice.name}</p>
          <Typography variant="h6" sx={{m:2, fontWeight: 'bold', textAlign: 'left', width:'90%' }} style={{ color: theme.palette.primary.main }}>
            추천교과 목록
          </Typography>
          <SearchTable />
        </>
      )}
    </Box>
  );
}

export default SubjectSearchInteractor;
