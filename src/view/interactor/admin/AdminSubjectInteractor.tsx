import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import SubjectTable from "../../presenter/admin/subject.ui/SubjectTable";
import { useAdminSubjectService } from "../../../service/admin/subject";
import { subjectDistinctState, subjectFilterState, subjectSummaryListState } from "../../../schema/states/SubjectTable";
import SubjectTabs from "../../presenter/admin/subject.ui/SubjectTabs";

const AdminSubjectInteractor = () => {
  const [distinct, setDistinct] = useRecoilState(subjectDistinctState);
  const [filter, setFilter] = useRecoilState(subjectFilterState);

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
          clickRow={(code) => {
            
          }}
          inputKeyword={debounce((value) => {
            setFilter({
              nameKeyword: value
            });
          }, 250)}
        />
      </SubjectTabs>
    </div>
  );
}

export default AdminSubjectInteractor;
