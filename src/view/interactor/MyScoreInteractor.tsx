import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  gradeListState,
  schoolListState,
  selectedSchoolIdState,
  studentState,
  subjectLabelState,
  subjectListState,
} from "../../schema/states/MyScore";
import FilterSelect from "../presenter/myScore.ui/FilterSelect";
import ScoreEditableTable from "../presenter/myScore.ui/ScoreEditableTable";
import { useMyScoreService } from "../../service/my-score";

import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SchoolSelect from "../presenter/myScore.ui/SchoolSelect";

const MyScoreInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [subjectLabel, setSubjectLabel] = useRecoilState(subjectLabelState);
  const setSubjectList = useSetRecoilState(subjectListState);
  const service = useMyScoreService();

  const setSchoolList = useSetRecoilState(schoolListState);
  const setGradeList = useSetRecoilState(gradeListState);
  const [student, setStudent] = useRecoilState(studentState);
  const selectedSchoolId = useRecoilValue(selectedSchoolIdState);
  const refetch = useCallback(() => {
    setLoading(true);

    Promise.all([
      service.getSchoolList(),
      service.getStudent(),
      service.getCommonSubjects(),
    ]).then((dataList) => {
      const [schoolList, student, subjectList] = dataList;
      setSchoolList(schoolList);
      setStudent(student);
      setSubjectList(subjectList);
      setLoading(false);
    });
  }, [service, setSchoolList, setStudent, setSubjectList]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!student) return;
    if (subjectLabel) {
      setLoading(true);
      service
        .getSubjectGrade(
          student?.id,
          subjectLabel === "공통과목" ? true : false
        )
        .then((data) => {
          setGradeList(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [service, setGradeList, student, subjectLabel]);

  const fetchCommonSubject = () => {
    setLoading(true);
    service
      .getCommonSubjects()
      .then((data) => {
        setSubjectList(data);
      })
      .finally(() => setLoading(false));
  };

  const fetchOptionalSubject = (id: string) => {
    setLoading(true);
    service
      .getOptionalSubjects(id)
      .then((data) => {
        setSubjectList(data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full flex my-4 justify-between">
          <SchoolSelect
            loading={loading}
            onChangeSchool={(id) => {
              void service.saveMySchool(id);
              setSubjectList([]);
              if (subjectLabel === "공통과목") {
                fetchCommonSubject();
              }
              if (subjectLabel === "선택과목") {
                fetchOptionalSubject(id);
              }
            }}
          />
          <FilterSelect
            loading={loading}
            selectSubjectLabel={(label) => {
              setSubjectList([]);
              if (label === "공통과목") {
                fetchCommonSubject();
              }

              if (label === "선택과목") {
                if (!student?.schoolId) return alert("학교를 선택해주세요.");
                fetchOptionalSubject(
                  selectedSchoolId ? selectedSchoolId : student?.schoolId
                );
              }
              setSubjectLabel(label);
            }}
          />
        </div>
        <Divider sx={{ mt: 1 }} />
        <div className="py-12">
          <ScoreEditableTable
            loading={loading}
            saveGradeScore={(form) => {
              if (!student?.id) return;

              setLoading(true);

              service
                .saveGradeScore(student.id, subjectLabel === "공통과목", form)
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MyScoreInteractor;
