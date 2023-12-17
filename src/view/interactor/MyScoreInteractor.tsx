import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { creditScoreValueListState, gradeScoreValueListState, subjectLabelState, subjectSummaryListState } from "../../schema/states/MyScore";
import FilterSelect from "../presenter/myScore.ui/FilterSelect";
import ScoreEditableTable from "../presenter/myScore.ui/ScoreEditableTable";
import { useMyScoreService } from "../../service/my-score";

import Divider from "@mui/material/Divider";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const MyScoreInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [subjectLabel, setSubjectLabel] = useRecoilState(subjectLabelState);
  const service = useMyScoreService();

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
        setLoading(false);
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
            <FilterSelect selectSubjectLabel={(label) => setSubjectLabel(label)}/>
          </div>
        </div>
        <Divider sx={{mt: 1}} />
        <div className="py-12">
          <ScoreEditableTable
            saveCreditScore={(form) => {
              setLoading(true);
              const prevScore = creditScoreValueList.find((v) => v.code === form.subjectCode);
              if (prevScore) {
                service.updateCreditScore(form, prevScore.id).then(() => refetch());
              } else {
                service.saveCreditScore(form).then(() => refetch());
              }
            }}
            saveGradeScore={(form) => {
              setLoading(true);
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MyScoreInteractor;
