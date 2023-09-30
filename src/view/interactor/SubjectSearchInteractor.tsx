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
import { Box, Typography } from "@mui/material";
import { theme } from "../../theme";

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
    <Box sx={{px:"15%"}}>
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
        }}
      />
      {showTable &&
      <>
        <p>검색된 대학(Univ): {univChoice}</p>
        <p>검색된 학과(Major): {majorChoice}</p>
        <Typography variant="h6" sx={{m:2, fontWeight: 'bold', textAlign: 'left', width:'90%' }} style={{ color: theme.palette.primary.main }}>
        추천교과 목록
      </Typography>
        <SearchTable />
      </>}
    </Box>
  );
}

export default SubjectSearchInteractor;
