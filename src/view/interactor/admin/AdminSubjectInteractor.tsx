import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import SubjectTable from "../../presenter/admin/subject.ui/SubjectTable";
import { useAdminSubjectService } from "../../../service/admin/subject";
import { commonSubjectDetailState, optionalSubjectDetailState, subjectDistinctState, subjectFilterState, subjectSummaryListState } from "../../../schema/states/SubjectTable";
import SubjectTabs from "../../presenter/admin/subject.ui/SubjectTabs";
import SubjectDetailDialog from "../../presenter/admin/subject.ui/SubjectDetailDialog";
import type { CommonSubjectDetail, OptionalSubjectDetail } from "../../../schema/types/SubjectTable";
import AddFloatButton from "../../presenter/admin/subject.ui/AddFloatButton";
import SubjectCreateDialog from "../../presenter/admin/subject.ui/SubjectCreateDialog";
import SubjectDeleteDialog from "../../presenter/admin/subject.ui/SubjectDeleteDialog";

const AdminSubjectInteractor = () => {
  const [distinct, setDistinct] = useRecoilState(subjectDistinctState);
  const [filter, setFilter] = useRecoilState(subjectFilterState);
  const setCommonDetail = useSetRecoilState(commonSubjectDetailState);
  const setOptionalDetail = useSetRecoilState(optionalSubjectDetailState);

  const setSubjectSummaryList = useSetRecoilState(subjectSummaryListState);
  const service = useAdminSubjectService();
  useEffect(() => {
    service.readSubject(distinct, filter)
      .then((data) => setSubjectSummaryList(data));
  }, [distinct, filter]);

  return (
    <div className="h-full">
      <SubjectTabs
        ux={{
          clickTab(value) {
            setDistinct(value);
          },
        }}
      >
        <SubjectTable
          ux={{
            clickRow(code) {
              if (distinct === "COMMON") {
                service.readSubjectProfile(code, distinct)
                  .then((data) => setCommonDetail(data as CommonSubjectDetail));
              }
              else if (distinct === "OPTION") {
                service.readSubjectProfile(code, distinct)
                  .then((data) => setOptionalDetail(data as OptionalSubjectDetail));
              }
            },
            inputKeyword: debounce((value) => {
              setFilter({
                nameKeyword: value
              });
            }, 250)
          }}
        >
          <SubjectDetailDialog
            modify={(form) => {
              service.editSubject(form)
                .then(() => {
                  service.readSubject(distinct, filter)
                    .then((data) => setSubjectSummaryList(data));
                });
            }}
          />
          <SubjectCreateDialog
            create={(form) => {
              service.addSubject(form)
                .then(() => {
                  service.readSubject(distinct, filter)
                    .then((data) => setSubjectSummaryList(data));
                });
            }}
          />
          <SubjectDeleteDialog
            delete={(code) => {
              service.deleteSubject({
                distinct,
                subjectCode: code
              }).then(() => {
                service.readSubject(distinct, filter)
                  .then((data) => setSubjectSummaryList(data));
              });
            }}
          />
          <AddFloatButton/>
        </SubjectTable>
      </SubjectTabs>
    </div>
  );
}

export default AdminSubjectInteractor;
