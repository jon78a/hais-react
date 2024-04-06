import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import { useAdminSchoolService } from "../../../service/admin/school";
import SchoolTabs from "../../presenter/admin/shool.ui/SchoolTabs";
import {
  schoolFilterState,
  schoolListState,
  schoolPaginationState,
  schoolState,
  schoolSubjectListState,
  schoolTabState,
} from "../../../schema/states/AdminSchool";
import SchoolTabContent from "../../presenter/admin/shool.ui/SchoolTabContent";
import SchoolSubjectTabContent from "../../presenter/admin/shool.ui/SchoolSubjectTabContent";
import { userState } from "../../../schema/states/User";
import { School, SchoolSubject } from "../../../domain/school/school.interface";

const AdminSchoolInteractor = () => {
  const [tabItem, setTabItem] = useRecoilState(schoolTabState);
  const [filter, setFilter] = useRecoilState(schoolFilterState);
  const [schoolList, setSchoolList] = useRecoilState(schoolListState);
  const user = useRecoilValue(userState);
  const setSchool = useSetRecoilState(schoolState);
  const [page, setPage] = useRecoilState(schoolPaginationState);

  const [schoolSubjectList, setSchoolSubjectList] = useRecoilState(
    schoolSubjectListState
  );

  const isSchoolTabSelected = tabItem === "SCHOOL";
  const isSubjectTabSelected = tabItem === "SUBJECT";

  const service = useAdminSchoolService();
  const fetchSchoolList = useCallback((): void => {
    service
      .getSchoolList({
        filter,
        cursor: page.cursor as School,
        pageSize: page.size,
        isPrev: page.isPrev,
      })
      .then((data) => {
        setSchoolList(data.data);
        setPage((prev) => ({ ...prev, totalElements: data.totalElements }));
      });
  }, [
    filter,
    page.cursor,
    page.isPrev,
    page.size,
    service,
    setPage,
    setSchoolList,
  ]);

  useEffect(() => {
    if (isSchoolTabSelected) {
      fetchSchoolList();
    }
  }, [fetchSchoolList, isSchoolTabSelected]);

  useEffect(() => {
    if (isSubjectTabSelected) {
      service
        .getSubjectList({
          filter,
        })
        .then((data) => {
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
    isSubjectTabSelected,
    page.cursor,
    page.isPrev,
    page.size,
    schoolList,
    service,
    setSchoolSubjectList,
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
              if (!form.data) return;
              const updatedForm = {
                ...form,
                data: {
                  ...form.data,
                  admin: [user?.email!],
                },
              };
              service.editSchool(updatedForm).then(() => {
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
              const updatedForm = {
                ...form,
                data: {
                  ...form.data,
                  admin: [user?.email!],
                },
              };
              service.addSchool(updatedForm).then(({ id }) => {
                fetchSchoolList();
              });
            },
            delete: (req) => {
              service.deleteSchool(req).then(() => {
                fetchSchoolList();
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
              const updatedReq = {
                ...req,
                data: {
                  ...req.data,
                  admin: [user?.email!],
                },
              };
              service.addSubject(updatedReq).then(({ id }) => {
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
              if (!req.data) return;
              const updatedReq = {
                ...req,
                data: {
                  ...req.data,
                  admin: [user?.email!],
                },
              };
              service.editSubject(updatedReq).then(() => {
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
                            subject.id === req.subjectId ? data : subject
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
