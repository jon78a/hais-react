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
  searchSummaryListState,
  searchDetailState
} from "../../schema/states/SubjectSearch";
import { Box, Typography } from "@mui/material";
import { theme } from "../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';

const SubjectSearchInteractor = () => {
  const service = useSubjectSearchService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);

  const [univChoice, setUnivChoice] = useRecoilState(univChoiceState);
  const [majorChoice, setMajorChoice] = useRecoilState(majorChoiceState);

  const setUnivChoiceList = useSetRecoilState(univChoiceListState);
  const setMajorChoiceList = useSetRecoilState(majorChoiceListState);
  const setSearchSummaryList = useSetRecoilState(searchSummaryListState);
  const setSearchDetail = useSetRecoilState(searchDetailState);

  //추가한 부분!
  const [showTable, setShowTable] = useState(false);
  const matchesDesktopSm = useMediaQuery('(max-width: 900px)');
  return (
    <Box sx={{ px: matchesDesktopSm ? "2%" : "15%" }}>
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
          <Typography variant="h6" sx={{m:2, fontWeight: 'bold', textAlign: 'left', width:'100%' }} style={{ color: theme.palette.primary.main }}>
            추천교과 목록
          </Typography>
          <SearchTable 
            clickMore={(code) => {
              service.searchMore(code).then((data) => setSearchDetail(data));
            }}
          />
  
        </>
      )}
    </Box>
  );
}

export default SubjectSearchInteractor;
