import { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import { useAdminSchoolService } from "../../../service/admin/school";
import SchoolTabs from "../../presenter/admin/shool.ui/SchoolTabs";
import {
  schoolFilterState,
  schoolListState,
  schoolState,
  schoolSubjectListState,
  schoolTabState,
} from "../../../schema/states/AdminSchool";
import SchoolTabContent from "../../presenter/admin/shool.ui/SchoolTabContent";
import SchoolSubjectTabContent from "../../presenter/admin/shool.ui/SchoolSubjectTabContent";

const AdminSchoolInteractor = () => {
  const [tabItem, setTabItem] = useRecoilState(schoolTabState);
  const [filter, setFilter] = useRecoilState(schoolFilterState);
  const [schoolList, setSchoolList] = useRecoilState(schoolListState);
  const setSchool = useSetRecoilState(schoolState);

  const [schoolSubjectList, setSchoolSubjectList] = useRecoilState(
    schoolSubjectListState
  );

  const isSchoolTabSelected = tabItem === "SCHOOL";
  const isSubjectTabSelected = tabItem === "SUBJECT";

  const service = useAdminSchoolService();

  useEffect(() => {
    if (isSchoolTabSelected) {
      service.getSchoolList(filter).then((data) => {
        setSchoolList(data);
      });
      return;
    }

    if (isSubjectTabSelected) {
      service.getSubjectList(filter).then((data) => {
        const subjectHavingSchoolName = data.map((subject) => ({
          ...subject,
          schoolName: schoolList.find(
            (school) => school.id === subject.schoolId
          )?.name,
        }));
        setSchoolSubjectList(subjectHavingSchoolName);
      });
    }
  }, [
    filter,
    isSchoolTabSelected,
    service,
    isSubjectTabSelected,
    setSchoolList,
    setSchoolSubjectList,
    schoolList,
  ]);

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
              service.addSchool(form).then(({ id }) => {
                setSchoolList((prev) => [...prev, { ...form.data, id }]);
              });
            },
            delete: (req) => {
              service.deleteSchool(req).then(() => {
                const newSchoolList = schoolList.filter(
                  (school) => school.id !== req.id
                );
                setSchoolList(newSchoolList);
              });
            },
          }}
        />
      );
    }
    if (isSubjectTabSelected) {
      return (
        <SchoolSubjectTabContent
          ux={{
            inputKeyword: debounce((value) => {
              setFilter({
                nameKeyword: value,
              });
            }, 250),
            create: (req) => {
              service.addSubject(req).then(({ id }) => {
                setSchoolSubjectList((prev) => [...prev, { ...req.data, id }]);
              });
            },
            delete: (req) => {
              service.deleteSubject(req).then(() => {
                const newSubjectList = schoolSubjectList.filter(
                  (subject) => subject.id !== req.subjectId
                );
                setSchoolSubjectList(newSubjectList);
              });
            },
            modify: (req) => {
              service.editSubject(req).then(() => {
                if (req?.data?.id) {
                  service
                    .getSubject({
                      isCommonSubject: req.data.type === "공통과목",
                      subjectId: req.subjectId,
                    })
                    .then((data): void => {
                      if (data) {
                        const newSubjectList = schoolSubjectList.map(
                          (subject) =>
                            subject.id === req.subjectId
                              ? {
                                  ...data,
                                  schoolName: schoolList.find(
                                    (sc) => sc.id === data.schoolId
                                  )?.name,
                                }
                              : subject
                        );

                        setSchoolSubjectList(newSubjectList);
                      }
                    });
                }
              });
            },
          }}
        />
      );
    }
    return undefined;
  }, [
    isSchoolTabSelected,
    isSubjectTabSelected,
    schoolList,
    schoolSubjectList,
    service,
    setFilter,
    setSchool,
    setSchoolList,
    setSchoolSubjectList,
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
