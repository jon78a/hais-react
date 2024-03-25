import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import _, { debounce, orderBy, uniqBy } from "lodash";

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
  studentCommonSubjectScoreState,
  studentOptionalSubjectScoreState,
} from "../../schema/states/SubjectRecommend";
import SearchBar from "../presenter/subject-recommend.ui/SearchBar";
import SubjectList from "../presenter/subject-recommend.ui/SubjectList";
import {
  SubjectRecommendService,
  useSubjectRecommendService,
} from "../../service/subject-recommend";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { accountState } from "../../schema/states/Account";
import AuthorizedUserSubjectList from "../presenter/subject-recommend.ui/AuthorizedUserSubjectList";
import { GridColOption } from "../presenter/subject-recommend.ux/AuthorizedUserSubjectListUx";
import { GridCallbackDetails, GridRowId } from "@mui/x-data-grid";
import { studentState } from "../../schema/states/MyScore";
import { creditState } from "../../schema/states/Year";

const useChangeKeywordEffect = (service: SubjectRecommendService) => {
  // Recoil States
  const isMatchUniv = useRecoilValue(isMatchUnivState);
  const univKeyword = useRecoilValue(univKeywordState);
  const majorKeyword = useRecoilValue(majorKeywordState);
  const fullNameKeyword = useRecoilValue(fullNameKeywordState);
  const setUnivSearchResultList = useSetRecoilState(univSearchResultListState);
  const setMajorResultList = useSetRecoilState(majorResultListState);
  const setMajorResultLoading = useSetRecoilState(majorResultLoadingState);

  // Effect
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
  const service = useSubjectRecommendService();
  // Recoil States
  const account = useRecoilValue(accountState);
  const majorResultList = useRecoilValue(majorResultListState);
  const student = useRecoilValue(studentState);

  const setUnivKeyword = useSetRecoilState(univKeywordState);
  const setMajorKeyword = useSetRecoilState(majorKeywordState);
  const setFullNameKeyword = useSetRecoilState(fullNameKeywordState);
  const setSelectedMajorCode = useSetRecoilState(selectedMajorIdState);
  const [majorResult, setMajorResult] = useRecoilState(majorWithSubjectState);
  const commonSubjectScore = useRecoilValue(studentCommonSubjectScoreState);
  const optionalSubjectScore = useRecoilValue(studentOptionalSubjectScoreState);
  const reqCredit = useRecoilValue(creditState);

  // Local States
  const [loading, setLoading] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<GridRowId[][]>([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [unSelectedModel, setUnSelectedModel] = useState<GridColOption[]>([]);
  const [precedencesSubjectList, setPrecedencesSubjectList] = useState<
    GridColOption[]
  >([]);

  // Computed Values
  const rows = useMemo(
    () => uniqBy([...unSelectedModel, ...precedencesSubjectList], "id"),
    [precedencesSubjectList, unSelectedModel]
  );

  const guidelineLength: number = majorResult?.guidelines?.length ?? 0;
  const avgScore = Number(
    _.mean([
      ...commonSubjectScore.map((c) => Number(c.grade)),
      ...optionalSubjectScore.map((o) => Number(o.grade)),
    ]).toFixed(2)
  );
  const isNeedToRecommendDifficultSubject: boolean = Boolean(avgScore <= 2);

  const orderedRows = useMemo(
    () =>
      orderBy(
        rows,
        [
          (row) => row.description,
          (row) =>
            majorResult?.precedences?.map((precedence) =>
              row.groups?.indexOf(precedence)
            ),
          (row) => row.level,
        ],
        ["asc", "desc", isNeedToRecommendDifficultSubject ? "desc" : "asc"]
      ),
    [isNeedToRecommendDifficultSubject, majorResult?.precedences, rows]
  );

  // Methods
  const calculateTotalAndUnselected = useCallback(() => {
    let total = 0;
    let unselected: GridColOption[] = [];

    if (!majorResult?.guidelines?.length) return { total, unselected };

    majorResult.guidelines.forEach((g, j) => {
      g.options.forEach((option) => {
        if (!option.id) return;
        if (selectionModel[j]?.includes(option.id)) {
          total += option.credit;
        } else {
          unselected.push({
            ...option,
            guideline: { type: g.type },
            description: "모집요강",
          });
        }
      });
    });

    rows.forEach((row) => {
      if (!row?.id) return;
      if (!selectionModel?.[guidelineLength]) return;
      if (selectionModel?.[guidelineLength].includes(row.id)) {
        total += row.credit;
      }
    });

    return { total, unselected };
  }, [majorResult?.guidelines, selectionModel, rows, guidelineLength]);

  const updateTotalCredit = useCallback(() => {
    const { total, unselected } = calculateTotalAndUnselected();
    setUnSelectedModel(unselected);
    setTotalCredit(total);
  }, [setUnSelectedModel, setTotalCredit, calculateTotalAndUnselected]);

  const handleSelectionModelChange = useCallback(
    (
      newSelection: GridRowId[],
      _: GridCallbackDetails<any>,
      guidelineIndex: number
    ) => {
      setSelectionModel((prevSelectionModel) => {
        const updatedModel = [...prevSelectionModel]; // Create a copy of the previous selection model
        updatedModel[guidelineIndex] = newSelection; // Update the selection model for the specific guideline
        return updatedModel; // Return the updated selection model
      });
    },
    []
  );

  const getPrecedenceSubjects = useCallback(
    async (precedences: string[], schoolId: string) => {
      const list: GridColOption[] = [];

      const subjects = await service.findSubjectByGroups(precedences, schoolId);

      subjects.forEach((subject) => {
        list.push({
          id: subject.id,
          credit: subject.credit,
          level: subject.level,
          groups: subject.groups,
          guideline: { type: subject.type },
          name: subject.name,
          description: "선호교과",
        });
      });

      return list;
    },
    [service]
  );

  const savePrecedenceSubjectsDataGridFormat = useCallback(async () => {
    if (!majorResult?.precedences) return;
    if (!student?.schoolId) return;

    const list = await getPrecedenceSubjects(
      majorResult?.precedences,
      student?.schoolId
    );

    setPrecedencesSubjectList(list);
  }, [getPrecedenceSubjects, majorResult?.precedences, student?.schoolId]);

  const initializeSelectionModel = useCallback(() => {
    if (!commonSubjectScore.length || !optionalSubjectScore.length) return;
    const initialSelectionModel: GridRowId[] = commonSubjectScore
      .map((subject) => subject.subjectId)
      .concat(optionalSubjectScore.map((subject) => subject.subjectId));

    majorResult?.guidelines?.forEach((guideline, index) => {
      handleSelectionModelChange(initialSelectionModel, {}, index);
    });
  }, [
    commonSubjectScore,
    handleSelectionModelChange,
    majorResult?.guidelines,
    optionalSubjectScore,
  ]);

  const selectAllRecommendSubjects = useCallback(() => {
    if (!orderedRows.length) return;
    let findIndex = 0;
    let credit = totalCredit;

    orderedRows.forEach((row, index) => {
      credit += row.credit;
      if (credit >= reqCredit) findIndex = index - 1;
      else findIndex = index + 1;
    });

    console.log("findIndex", findIndex);

    const recommendModel: GridRowId[] = orderedRows
      .slice(0, findIndex)
      .map((row) => row.id!);
    handleSelectionModelChange(recommendModel, {}, guidelineLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guidelineLength, handleSelectionModelChange, orderedRows.length]);

  // effects
  useEffect(
    () => () => {
      setUnivKeyword("");
      setFullNameKeyword("");
      setSelectedMajorCode(null);
    },
    [setUnivKeyword, setFullNameKeyword, setSelectedMajorCode]
  );

  useEffect(() => {
    initializeSelectionModel();
  }, [initializeSelectionModel]);

  useEffect(() => {
    updateTotalCredit();
  }, [updateTotalCredit]);

  useEffect(() => {
    savePrecedenceSubjectsDataGridFormat();
  }, [savePrecedenceSubjectsDataGridFormat]);

  useEffect(() => {
    selectAllRecommendSubjects();
  }, [selectAllRecommendSubjects]);

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
                      id,
                      name: item?.name,
                      groups: item?.groups,
                      credit: item?.credit ?? 0,
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
        {account ? (
          <AuthorizedUserSubjectList
            loading={loading}
            totalCredit={totalCredit}
            rows={orderedRows}
            selectionModel={selectionModel}
            guidelineLength={guidelineLength}
            handleSelectionModelChange={handleSelectionModelChange}
            avgScore={avgScore}
          />
        ) : (
          <SubjectList
            selectionModel={selectionModel}
            handleSelectionModelChange={handleSelectionModelChange}
          />
        )}
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
