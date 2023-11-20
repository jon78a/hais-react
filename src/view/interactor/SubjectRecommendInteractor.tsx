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
  subjectDataListState,
  recommendStatusState,
} from "../../schema/states/SubjectRecommend";
import SearchBar from "../presenter/subject-recommend.ui/SearchBar";
import SubjectList from "../presenter/subject-recommend.ui/SubjectList";
import {
  SubjectRecommendService,
  useSubjectRecommendService,
} from "../../service/subject-recommend";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const useChangeKeywordEffect = (service: SubjectRecommendService) => {
  const searchMode = useRecoilValue(searchModeState);
  const isMatchUniv = useRecoilValue(isMatchUnivState);

  const univKeyword = useRecoilValue(univKeywordState);
  const majorKeyword = useRecoilValue(majorKeywordState);
  const fullNameKeyword = useRecoilValue(fullNameKeywordState);

  const setUnivSearchResultList = useSetRecoilState(univSearchResultListState);
  const setMajorResultList = useSetRecoilState(majorResultListState);

  useEffect(() => {
    service.suggestUniv("").then((results) => setUnivSearchResultList(results));
  }, [service, setUnivSearchResultList]);

  useEffect(() => {
    function clear() {
      setMajorResultList([]);
    }

    switch (searchMode) {
      case "UNIV":
        if (!isMatchUniv) return clear;
        service
          .searchByMajorKeywordOnUnivName(majorKeyword, univKeyword)
          .then((results) => setMajorResultList(results));
        return clear;
      case "FULL":
        if (!fullNameKeyword) return clear;
        service
          .searchByUnivOrMajor(fullNameKeyword)
          .then((results) => setMajorResultList(results));
        return clear;
    }
  }, [
    service,
    searchMode,
    isMatchUniv,
    univKeyword,
    majorKeyword,
    fullNameKeyword,
    setUnivSearchResultList,
    setMajorResultList,
  ]);
};

const SubjectRecommendInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const service = useSubjectRecommendService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);
  const setFullNameKeyword = useSetRecoilState(fullNameKeywordState);
  const setSearchMode = useSetRecoilState(searchModeState);

  const setSelectedMajorCode = useSetRecoilState(selectedMajorIdState);

  useEffect(
    () => () => {
      setUnivKeyword("");
      setFullNameKeyword("");
      setSearchMode("UNIV");
      setSelectedMajorCode(null);
    },
    [setUnivKeyword, setFullNameKeyword, setSearchMode, setSelectedMajorCode]
  );

  useChangeKeywordEffect(service);

  const setSubjectDataList = useSetRecoilState(subjectDataListState);
  const setRecommendStatus = useSetRecoilState(recommendStatusState);

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
            service.recommend(list).then((status) => {
              setRecommendStatus(status);
              setLoading(false);
            });
          });
        }}
      />
      <div className="mt-4 pb-12">
        <SubjectList />
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SubjectRecommendInteractor;
