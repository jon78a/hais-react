import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import { AdminMajorService, useAdminMajorService } from "../../../service/admin/major";
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
  subjectDataListState
} from "../../../schema/states/AdminMajor";
import SubjectControlForm from "../../presenter/admin/major.ui/SubjectControlForm";
import SubjectList from "../../presenter/admin/major.ui/SubjectList";

const useChangeKeywordEffect = (service: AdminMajorService) => {
  const searchMode = useRecoilValue(searchModeState);
  const isMatchUniv = useRecoilValue(isMatchUnivState);

  const univKeyword = useRecoilValue(univKeywordState);
  const majorKeyword = useRecoilValue(majorKeywordState);
  const fullNameKeyword = useRecoilValue(fullNameKeywordState);

  const setUnivSearchResultList = useSetRecoilState(univSearchResultListState);
  const setMajorResultList = useSetRecoilState(majorResultListState);

  useEffect(() => {
    service.suggestUniv("")
      .then((results) => setUnivSearchResultList(results));
  }, []);

  useEffect(() => {
    switch(searchMode) {
      case "UNIV":
        if (!isMatchUniv) return;
        service.searchByMajorKeywordOnUnivName(majorKeyword, univKeyword)
          .then((results) => setMajorResultList(results));
        return;
      case "FULL":
        if (!fullNameKeyword) return;
        service.searchByUnivOrMajor(fullNameKeyword)
          .then((results) => setMajorResultList(results));
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
    setMajorResultList
  ]);
}

const AdminMajorInteractor = () => {
  const service = useAdminMajorService();

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);
  const setFullNameKeyword = useSetRecoilState(fullNameKeywordState);
  const setSearchMode = useSetRecoilState(searchModeState);

  const setSelectedMajorCode = useSetRecoilState(selectedMajorIdState);

  useChangeKeywordEffect(service);

  const setSubjectDataList = useSetRecoilState(subjectDataListState);

  return (
    <div>
      <SearchBar
        selectSearchMode={(mode) => {
          setSearchMode(mode);
        }}
        inputKeyword={debounce((value: string, type) => {
          switch(type) {
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
          setSelectedMajorCode(id);
          service.readSubjectList(id)
            .then((list) => setSubjectDataList(list));
        }}
      />
      <SubjectControlForm
        addSubject={(code) => {}}
        removeSubject={(code) => {}}
      />
      <div className="mt-4 pb-12">
        <SubjectList/>
      </div>
    </div>
  );
}

export default AdminMajorInteractor;
