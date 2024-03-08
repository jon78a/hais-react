import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import {
  fullNameKeywordState,
  majorResultListState,
  isMatchUnivState,
  majorKeywordState,
  selectedMajorIdState,
  univKeywordState,
  univSearchResultListState,
  majorResultLoadingState,
  majorWithSubjectState,
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
  const isMatchUniv = useRecoilValue(isMatchUnivState);

  const univKeyword = useRecoilValue(univKeywordState);
  const majorKeyword = useRecoilValue(majorKeywordState);
  const fullNameKeyword = useRecoilValue(fullNameKeywordState);

  const setUnivSearchResultList = useSetRecoilState(univSearchResultListState);
  const setMajorResultList = useSetRecoilState(majorResultListState);
  const setMajorResultLoading = useSetRecoilState(majorResultLoadingState);

  useEffect(() => {
    service.suggestUniv("").then((results) => setUnivSearchResultList(results));
  }, [service, setUnivSearchResultList]);

  useEffect(() => {
    function clear() {
      setMajorResultList([]);
    }

    if (!isMatchUniv) return clear;
    setMajorResultLoading(true);
    service
      .getDepartmentOnUniv(majorKeyword, univKeyword)
      .then((results) => {
        setMajorResultList(results);
      })
      .finally(() => setMajorResultLoading(false));
    return clear;
  }, [
    service,
    isMatchUniv,
    univKeyword,
    majorKeyword,
    fullNameKeyword,
    setUnivSearchResultList,
    setMajorResultList,
    setMajorResultLoading,
  ]);
};

const SubjectRecommendInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const service = useSubjectRecommendService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);
  const setFullNameKeyword = useSetRecoilState(fullNameKeywordState);

  const majorResultList = useRecoilValue(majorResultListState);

  const setSelectedMajorCode = useSetRecoilState(selectedMajorIdState);
  const setMajorResult = useSetRecoilState(majorWithSubjectState);

  useEffect(
    () => () => {
      setUnivKeyword("");
      setFullNameKeyword("");
      setSelectedMajorCode(null);
    },
    [setUnivKeyword, setFullNameKeyword, setSelectedMajorCode]
  );

  useChangeKeywordEffect(service);

  return (
    <div className="mt-6">
      <SearchBar
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
          const major = majorResultList.find((v) => v.id === id);
          if (!major) {
            return;
          }
          if (id) setSelectedMajorCode(id);
          setLoading(true);

          service
            .readSubjectList(major.guidelines || [])
            .then((list) => {
              const result = {
                ...major,
                guidelines: major.guidelines?.map((g) => ({
                  ...g,
                  options: g.options.map((id) => {
                    const item = list.find((item) => item?.id === id);
                    return {
                      id: item?.id,
                      name: item?.name,
                      groups: item?.groups,
                    };
                  }),
                })),
              };

              setMajorResult(result);
            })
            .finally(() => setLoading(false));
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
