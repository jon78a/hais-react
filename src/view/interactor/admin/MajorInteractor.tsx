import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import {
  AdminMajorService,
  useAdminMajorService,
} from "../../../service/admin/major";
import SearchBar from "../../presenter/admin/major.ui/SearchBar";
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
  selectedMajorState,
  majorResultLoadingState,
} from "../../../schema/states/AdminMajor";
import MajorRecruitForm from "../../presenter/admin/major.ui/MajorRecruitForm";
// import SubjectList from "../../presenter/admin/major.ui/SubjectList";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const useChangeKeywordEffect = (service: AdminMajorService) => {
  const searchMode = useRecoilValue(searchModeState);
  const isMatchUniv = useRecoilValue(isMatchUnivState);

  const univKeyword = useRecoilValue(univKeywordState);
  const majorKeyword = useRecoilValue(majorKeywordState);
  const fullNameKeyword = useRecoilValue(fullNameKeywordState);

  const setUnivSearchResultList = useSetRecoilState(univSearchResultListState);
  const setMajorResultList = useSetRecoilState(majorResultListState);

  const setMajorResultLoading = useSetRecoilState(majorResultLoadingState);

  useEffect(() => {
    service.suggestUniv("").then((results) => setUnivSearchResultList(results));
  }, []);

  useEffect(() => {
    switch (searchMode) {
      case "UNIV":
        if (!isMatchUniv) return;
        setMajorResultLoading(true);
        service
          .searchByMajorKeywordOnUnivName(majorKeyword, univKeyword)
          .then((results) => setMajorResultList(results))
          .finally(() => setMajorResultLoading(false));
        return;
      case "FULL":
        if (!fullNameKeyword) return;
        setMajorResultLoading(true);
        service
          .searchByUnivOrMajor(fullNameKeyword)
          .then((results) => setMajorResultList(results))
          .finally(() => setMajorResultLoading(false));
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
    setMajorResultList,
    setMajorResultLoading
  ]);
};

const AdminMajorInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const service = useAdminMajorService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);
  const setFullNameKeyword = useSetRecoilState(fullNameKeywordState);
  const setSearchMode = useSetRecoilState(searchModeState);

  const [majorResultList, setMajorResultList] =
    useRecoilState(majorResultListState);
  const [selectedMajorId, setSelectedMajorId] =
    useRecoilState(selectedMajorIdState);

  const selectedMajor = useRecoilValue(selectedMajorState);

  useChangeKeywordEffect(service);

  const setSubjectDataList = useSetRecoilState(subjectDataListState);

  return (
    <>
      <div className="flex flex-col space-y-10 pb-20">
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
            setSelectedMajorId(id);
            service
              .readSubjectList(id)
              .then((list) => setSubjectDataList(list));
          }}
        />
        <MajorRecruitForm
          addGroup={(value) => {
            if (!selectedMajor) {
              return;
            }
            setMajorResultList(
              majorResultList.map((result) => {
                if (result.id === selectedMajorId) {
                  return {
                    ...result,
                    requiredGroups: [value, ...result.requiredGroups],
                  };
                }
                return result;
              })
            );
          }}
          removeGroup={(index) => {
            if (!selectedMajor) {
              return;
            }
            setMajorResultList(
              majorResultList.map((result) => {
                if (result.id === selectedMajorId) {
                  return {
                    ...result,
                    requiredGroups: result.requiredGroups.filter(
                      (_, curr) => curr !== index
                    ),
                  };
                }
                return result;
              })
            );
          }}
          inputDifficulty={(value) => {
            if (!selectedMajor) {
              return;
            }
            setMajorResultList(
              majorResultList.map((result) => {
                if (result.id === selectedMajorId) {
                  return {
                    ...result,
                    difficulty: value,
                  };
                }
                return result;
              })
            );
          }}
          save={() => {
            if (!selectedMajor) {
              return;
            }
            setLoading(true);
            service.submitMajorRecruit({
              requiredGroups: selectedMajor.requiredGroups,
              difficulty: selectedMajor.difficulty
            }, selectedMajorId).finally(() => setLoading(false));
          }}
        />
        {/* <div className="mt-4 pb-12">
          <SubjectList/>
        </div> */}
      </div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AdminMajorInteractor;
