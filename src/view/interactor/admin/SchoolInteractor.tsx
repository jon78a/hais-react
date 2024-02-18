import { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import { useAdminSchoolService } from "../../../service/admin/school";
import SchoolTabs from "../../presenter/admin/shool.ui/SchoolTabs";
import {
  schoolFilterState,
  schoolListState,
  schoolState,
  schoolTabState,
} from "../../../schema/states/AdminSchool";
import { readExcel } from "../../../policy/file";
import SchoolTabContent from "../../presenter/admin/shool.ui/SchoolTabContent";
import SchoolSubjectTabContent from "../../presenter/admin/shool.ui/SchoolSubjectTabContent";

const AdminSchoolInteractor = () => {
  const [tabItem, setTabItem] = useRecoilState(schoolTabState);
  const [filter, setFilter] = useRecoilState(schoolFilterState);
  const [schoolList, setSchoolList] = useRecoilState(schoolListState);

  const isSchoolTabSelected = tabItem === "SCHOOL";
  const isSubjectTabSelected = tabItem === "SUBJECT";

  const setSchool = useSetRecoilState(schoolState);
  const service = useAdminSchoolService();

  useEffect(() => {
    service.getSchoolList(filter).then((data) => {
      setSchoolList(data);
    });
  }, [filter, service, setSchoolList]);

  const renderTabContent: React.JSX.Element | undefined = useMemo(() => {
    if (isSchoolTabSelected) {
      return (
        <SchoolTabContent
          ux={{
            clickRow(id) {
              return service
                .getSchool(id)
                .then((school) => school && setSchool(school));
            },
            inputKeyword: debounce((value) => {
              setFilter({
                nameKeyword: value,
              });
            }, 250),
            modify: (form) => {
              service.editSchool(form).then(() => {
                if (form?.data?.id) {
                  service.getSchool(form?.data?.id).then((data): void => {
                    if (data) {
                      const newSchoolList = schoolList.map((school) =>
                        school.id === data.id ? data : school
                      );
                      setSchoolList(newSchoolList);
                      setSchool(data);
                    }
                  });
                }
              });
            },
            create: (form) => {
              service.addSchool(form).then(() => {
                console.log(form);
              });
            },
            delete: (form) => {
              service.deleteSchool(form).then(() => {
                const newSchoolList = schoolList.filter(
                  (school) => school.id !== form.id
                );
                setSchoolList(newSchoolList);
              });
            },
            uploadExcel: (e) => {
              console.log(e);
              readExcel(e);
            },
            sampleExcelLink: "/files/sample.xlsx",
          }}
        />
      );
    }
    if (isSubjectTabSelected) {
      return (
        <SchoolSubjectTabContent
          ux={{
            clickRow(school) {
              console.log(school);
            },
            inputKeyword: debounce((value) => {
              setFilter({
                nameKeyword: value,
              });
            }, 250),
          }}
        />
      );
    }
    return undefined;
  }, [
    isSchoolTabSelected,
    isSubjectTabSelected,
    schoolList,
    service,
    setFilter,
    setSchool,
    setSchoolList,
  ]);

  return (
    <div className="h-full">
      <SchoolTabs
        ux={{
          clickTab(value) {
            setTabItem(value);
          },
        }}
      >
        {renderTabContent}
      </SchoolTabs>
    </div>
  );
};

export default AdminSchoolInteractor;
