import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { creditScoreValueListState, gradeScoreValueListState, selectedSchoolYearState, subjectLabelState, subjectSummaryListState } from "../../schema/states/MyScore";
import FilterSelect from "../presenter/myScore.ui/FilterSelect";
import ScoreEditableTable from "../presenter/myScore.ui/ScoreEditableTable";
import { useMyScoreService } from "../../service/my-score";
import Divider from "@mui/material/Divider";

const MyScoreInteractor = () => {
  const setSelectedSchoolYear = useSetRecoilState(selectedSchoolYearState);
  const service = useMyScoreService();

  const subjectLabel = useRecoilValue(subjectLabelState);

  const setSubjectSummaryList = useSetRecoilState(subjectSummaryListState);
  const [creditScoreValueList, setCreditScoreValueList] = useRecoilState(creditScoreValueListState);
  const [gradeScoreValueList, setGradeScoreValueList] = useRecoilState(gradeScoreValueListState);

  const refetch = useCallback(() => {
    Promise.all([
      service.showSubjectSummaryList(subjectLabel),
      service.readCreditScoreList(),
      service.readGradeScoreList(),
    ])
      .then((dataList) => {
        const [subjectSummaryList, creditScoreList, gradeScoreList] = dataList;
        setSubjectSummaryList(subjectSummaryList);
        setCreditScoreValueList(creditScoreList);
        setGradeScoreValueList(gradeScoreList);
      });
  }, [
    subjectLabel,
    service,
    setSubjectSummaryList,
    setCreditScoreValueList,
    setGradeScoreValueList
  ]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full flex justify-end my-4">
          <div className="mr-16">
            <FilterSelect selectSchoolYear={(year) => setSelectedSchoolYear(year)}/>
          </div>
        </div>
        <Divider sx={{mt: 1}} />
        <div className="py-12">
          <ScoreEditableTable
            saveCreditScore={(form) => {
              const prevScore = creditScoreValueList.find((v) => v.code === form.subjectCode);
              if (prevScore) {
                service.updateCreditScore(form, prevScore.id).then(() => refetch());
              } else {
                service.saveCreditScore(form).then(() => refetch());
              }
            }}
            saveGradeScore={(form) => {
              const prevScore = gradeScoreValueList.find((v) => v.code === form.subjectCode);
              if (prevScore) {
                service.updateGradeScore(form, prevScore.id).then(() => refetch());
              } else {
                service.saveGradeScore(form).then(() => refetch());
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MyScoreInteractor;
