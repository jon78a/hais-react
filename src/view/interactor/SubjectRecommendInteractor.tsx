import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import _, { debounce, orderBy, uniqBy } from "lodash";

import {
  fullNameKeywordState,
  majorResultListState,
  majorKeywordState,
  selectedMajorIdState,
  univKeywordState,
  univSearchResultListState,
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
import { useNavigate } from "react-router-dom";
import { authPermissionRoutes } from "../../routes";
import { DepartmentWithSubject } from "../../domain/univ/univ.interface";

const useChangeKeywordEffect = (service: SubjectRecommendService) => {
  // Recoil States
  const univKeyword = useRecoilValue(univKeywordState);
  const majorKeyword = useRecoilValue(majorKeywordState);
  const setUnivSearchResultList = useSetRecoilState(univSearchResultListState);
  const setMajorResultList = useSetRecoilState(majorResultListState);

  // Effect
  useEffect(() => {
    service.suggestUniv("").then((results) => setUnivSearchResultList(results));
  }, [service, setUnivSearchResultList]);

  useEffect(() => {
    service.getDepartmentOnUniv(majorKeyword, univKeyword).then((results) => {
      setMajorResultList(results);
    });
  }, [majorKeyword, service, setMajorResultList, univKeyword]);
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
  const [rows, setRows] = useState<GridColOption[]>([]);

  // Computed Values
  const guidelineLength: number = majorResult?.guidelines?.length ?? 0;
  const avgScore = Number(
    _.mean([
      ...commonSubjectScore.map((c) => Number(c.grade)),
      ...optionalSubjectScore.map((o) => Number(o.grade)),
    ]).toFixed(2)
  );

  const levelStandard = 2;
  const isNeedToRecommendDifficultSubject: boolean = Boolean(
    avgScore <= levelStandard
  );

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
  const calculateTotalAndUnselected = () => {
    let total = 0;
    let unselected: GridColOption[] = [];

    const guidelines = majorResult?.guidelines;

    if (!guidelines?.length) return { total, unselected };

    guidelines.forEach((g, j) => {
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
  };

  const updateTotalCredit = () => {
    const { total, unselected } = calculateTotalAndUnselected();
    setTotalCredit(total);
    return unselected;
  };

  const handleSelectionModelChange = (
    newSelection: GridRowId[],
    _: GridCallbackDetails<any>,
    guidelineIndex: number
  ) => {
    setSelectionModel((prevSelectionModel) => {
      const updatedModel = [...prevSelectionModel]; // Create a copy of the previous selection model
      updatedModel[guidelineIndex] = newSelection; // Update the selection model for the specific guideline
      return updatedModel; // Return the updated selection model
    });
    updateTotalCredit();
  };

  const getPrecedenceSubjects = async (
    precedences: string[],
    schoolId: string
  ) => {
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
  };

  const savePrecedenceSubjectsDataGridFormat = async () => {
    if (!majorResult?.precedences) return;
    if (!student?.schoolId) return;

    const list = await getPrecedenceSubjects(
      majorResult?.precedences,
      student?.schoolId
    );

    return list;
  };

  const getSubjectsHaveTaken = (): GridRowId[] | undefined => {
    if (!commonSubjectScore.length || !optionalSubjectScore.length) return;
    return commonSubjectScore
      .map((subject) => subject.subjectId)
      .concat(optionalSubjectScore.map((subject) => subject.subjectId));
  };

  const selectAllRecommendSubjects = () => {
    if (!orderedRows.length) return;
    let findIndex = 0;
    let credit = totalCredit;

    for (let i = 0; i < orderedRows.length; i++) {
      if (orderedRows[i].description === "모집요강") {
        findIndex = i + i;
      } else if (credit >= reqCredit) {
        findIndex = i;
        break;
      } else {
        findIndex = i + 1;
      }
      credit += orderedRows[i].credit;
    }

    const recommendModel: GridRowId[] = orderedRows
      .slice(0, findIndex)
      .map((row) => row.id!);

    handleSelectionModelChange(recommendModel, {}, guidelineLength);
  };

  const updateRows = async () => {
    const unSelectedModel = updateTotalCredit();
    const precedencesSubjectList = await savePrecedenceSubjectsDataGridFormat();
    setRows(
      uniqBy([...unSelectedModel, ...(precedencesSubjectList || [])], "id")
    );
  };

  const onClickMajor = async (id: string) => {
    const major = majorResultList.find((v) => v.id === id);
    if (!major) return;
    if (id) setSelectedMajorCode(id);

    setLoading(true);

    const list = await service.readSubjectList(major.guidelines || []);
    const model = getSubjectsHaveTaken();
    const result = {
      ...major,
      guidelines: major.guidelines?.map((g, i) => {
        if (model) handleSelectionModelChange(model, {}, i);
        return {
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
        };
      }),
    };
    setMajorResult(result);
    setLoading(false);
  };

  useEffect(() => {
    updateRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionModel]);

  useEffect(() => {
    selectAllRecommendSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedRows.length]);

  useChangeKeywordEffect(service);

  useEffect(() => {
    setUnivKeyword("");
    setFullNameKeyword("");
    setSelectedMajorCode("");
  }, [setFullNameKeyword, setUnivKeyword, setSelectedMajorCode]);

  const navigate = useNavigate();

  useEffect(() => {
    let shouldConfirm = false;

    if (!account || !selectionModel || !isNaN(avgScore)) return;

    const confirmPrompt = () => {
      const confirm = window.confirm("점수를 입력해주세요");
      if (confirm) {
        shouldConfirm = true;
        navigate(authPermissionRoutes.my.path);
      }
    };

    confirmPrompt();

    return () => {
      if (shouldConfirm) {
        window.removeEventListener("beforeunload", confirmPrompt);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, avgScore, selectionModel]);

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
        clickMajor={(id) => onClickMajor(id!)}
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
