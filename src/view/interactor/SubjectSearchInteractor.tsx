import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import {
  fullNameKeywordState,
  majorResultListState,
  isMatchUnivState,
  majorKeywordState,
  searchModeState,
  selectedMajorIdState,
  univKeywordState,
  univSearchResultListState,
  subjectDataListState
} from "../../schema/states/SubjectSearch";
import SearchBar from "../presenter/subject-search.ui/SearchBar";
import SubjectList from "../presenter/subject-search.ui/SubjectList";
import { SubjectSearchService, useSubjectSearchService } from "../../service/subject-search";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const useChangeKeywordEffect = (service: SubjectSearchService) => {
  const searchMode = useRecoilValue(searchModeState);
  const isMatchUniv = useRecoilValue(isMatchUnivState);

  const univKeyword = useRecoilValue(univKeywordState);
  const majorKeyword = useRecoilValue(majorKeywordState);
  const fullNameKeyword = useRecoilValue(fullNameKeywordState);

  const setUnivSearchResultList = useSetRecoilState(univSearchResultListState);
  const setFullNameResultList = useSetRecoilState(majorResultListState);

  useEffect(() => {
    service.suggestUniv("")
      .then((results) => setUnivSearchResultList(results));
  }, []);

  useEffect(() => {
    switch(searchMode) {
      case "UNIV":
        if (!isMatchUniv) return;
        service.searchByMajorKeywordOnUnivName(majorKeyword, univKeyword)
          .then((results) => setFullNameResultList(results));
        return;
      case "FULL":
        if (!fullNameKeyword) return;
        service.searchByUnivOrMajor(fullNameKeyword)
          .then((results) => setFullNameResultList(results));
        return;
    }
  }, [
    service,
    searchMode,
    isMatchUniv,
    univKeyword,
    majorKeyword,
    fullNameKeyword,
    setUnivSearchResultList,
    setFullNameResultList
  ]);
}

const SubjectSearchInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const service = useSubjectSearchService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);
  const setFullNameKeyword = useSetRecoilState(fullNameKeywordState);
  const setSearchMode = useSetRecoilState(searchModeState);

  const setSelectedMajorCode = useSetRecoilState(selectedMajorIdState);

  useChangeKeywordEffect(service);

  const setSubjectDataList = useSetRecoilState(subjectDataListState);

  return (
    <div className="mt-6">
      <SearchBar
        selectSearchMode={(mode) => {
          setSearchMode(mode);
        }}
        inputKeyword={debounce((value: string, type) => {
          switch (type) {
            case "univ":
              setUnivKeyword(value);
              return;
            case "major":
              setMajorKeyword(value);
              return;
            case "full":
              setFullNameKeyword(value);
              return;
          }
        }, 250)}
        clickMajor={(id) => {
          setLoading(true);
          setSelectedMajorCode(id);
          service.readSubjectList(id).then((list) => {
            setSubjectDataList(list);
            setLoading(false);
          });
        }}
      />
      <div className="mt-4 pb-12">
        <SubjectList />
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SubjectSearchInteractor;
