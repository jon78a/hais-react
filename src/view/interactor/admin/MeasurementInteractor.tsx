import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import Measurement from "../../presenter/admin/measurement.ui/Measurement";
import { scoreWeightListState, subjectWeightListState } from "../../../schema/states/AdminMeasurement";
import { useMeasurementService } from "../../../service/admin/measurement";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const MeasurementInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const service = useMeasurementService();

  const setSubjectWeightList = useSetRecoilState(subjectWeightListState);
  const setScoreWeightList = useSetRecoilState(scoreWeightListState);

  useEffect(() => {
    Promise.all([
      service.readSubjectWeightList(),
      service.readScoreWeightList()
    ])
      .then((dataList) => {
        const [subjectWeightList, scoreWeightList] = dataList;
        setSubjectWeightList(subjectWeightList);
        setScoreWeightList(scoreWeightList);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Measurement
        submitScoreWeightForm={(form) => {
          setLoading(true);
          service.editScoreWeight(form)
            .then(() => {
              service.readScoreWeightList()
                .then((data) => {
                  setScoreWeightList(data);
                  setLoading(false);
                });
            });
        }}
        submitSubjectWeightForm={(form) => {
          setLoading(true);
          service.editSubjectWeight(form)
            .then(() => {
              service.readSubjectWeightList()
                .then((data) => {
                  setSubjectWeightList(data);
                  setLoading(false);
                });
            });
        }}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MeasurementInteractor;
