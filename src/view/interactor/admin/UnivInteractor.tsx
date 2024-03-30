import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import {
  departmentListState,
  guideLineFormState,
  univFilterState,
  univListState,
  univState,
  univTabState,
} from "../../../schema/states/AdminUniv";
import { useAdminUnivService } from "../../../service/admin/univ";
import UnivTabContent from "../../presenter/admin/univ.ui/UnivTabContent";
import UnivTabs from "../../presenter/admin/univ.ui/UnivTabs";
import DepartmentTabContent from "../../presenter/admin/univ.ui/DepartmentTabContent";
import { userState } from "../../../schema/states/User";

const AdminUnivInteractor = () => {
  const [tabItem, setTabItem] = useRecoilState(univTabState);
  const [filter, setFilter] = useRecoilState(univFilterState);
  const [univList, setUnivList] = useRecoilState(univListState);
  const setUniv = useSetRecoilState(univState);
  const [departmentList, setDepartmentList] =
    useRecoilState(departmentListState);
  const user = useRecoilValue(userState);

  const guidelineForm = useRecoilValue(guideLineFormState);

  const isUnivTabSelected = tabItem === "UNIV";
  const isSubjectTabSelected = tabItem === "DEPARTMENT";

  const service = useAdminUnivService();

  useEffect(() => {
    service.getUnivList(filter).then((data) => {
      setUnivList(data);
    });
  }, [filter, service, setUnivList]);

  useEffect(() => {
    if (isSubjectTabSelected) {
      service.getDepartmentList(filter).then((data) => {
        const departmentListHavingUnivName = data.map((department) => ({
          ...department,
          universityName: univList.find((u) => u.id === department.universityId)
            ?.name,
        }));
        setDepartmentList(departmentListHavingUnivName);
      });
    }
  }, [filter, isSubjectTabSelected, service, setDepartmentList, univList]);

  const renderTabContent: React.JSX.Element | undefined = useMemo(() => {
    if (isUnivTabSelected) {
      return (
        <UnivTabContent
          ux={{
            clickRow(id) {
              return service.getUniv(id).then((univ) => univ && setUniv(univ));
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
              service.editUniv(updatedForm).then(() => {
                if (form?.data?.id) {
                  service.getUniv(form?.data?.id).then((data): void => {
                    if (data) {
                      const newSchoolList = univList.map((univ) =>
                        univ.id === data.id ? data : univ
                      );
                      setUnivList(newSchoolList);
                      setUniv(data);
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
              service.addUniv(updatedForm).then(({ id }) => {
                setUnivList((prev) => [...prev, { ...form.data, id }]);
              });
            },
            delete: (req) => {
              service.deleteUniv(req).then(() => {
                const newSchoolList = univList.filter(
                  (univ) => univ.id !== req.id
                );
                setUnivList(newSchoolList);
              });
            },
          }}
        />
      );
    }
    if (isSubjectTabSelected) {
      return (
        <DepartmentTabContent
          ux={{
            inputKeyword: debounce((value) => {
              setFilter({
                nameKeyword: value,
              });
            }, 250),
            create(req) {
              const updatedReq = {
                ...req,
                data: {
                  ...req.data,
                  admin: [user?.email!],
                },
              };
              service.addDepartment(updatedReq).then(({ id }) => {
                setDepartmentList((prev) => [...prev, { ...req.data, id }]);
              });
            },
            delete(req) {
              service.deleteDepartment(req).then(() => {
                const newDepartmentList = departmentList.filter(
                  (department) => department.id !== req.id
                );
                setDepartmentList(newDepartmentList);
              });
            },
            modify(form) {
              if (!form.data) return;
              const updatedForm = {
                ...form,
                data: {
                  ...form.data,
                  admin: [user?.email!],
                },
              };
              service.editDepartment(updatedForm).then(() => {
                if (form?.data?.id) {
                  const newDepartmentList = departmentList.map((department) =>
                    department.id === form.data?.id ? form.data : department
                  );
                  setDepartmentList(newDepartmentList);
                }
              });
            },
            getSubjectList(type) {
              return service.getSubjectList(type).then((data) => {
                const subjectList = (data || [])?.map((d) => ({
                  id: d.id,
                  name: d.name,
                  schoolId: d.schoolId,
                  type: d.type,
                  groups: d.groups,
                  level: d.level,
                  credit: d.credit,
                  admin: d.admin,
                }));
                return subjectList;
              });
            },
            async guidelineFormSubmit(e, departmentId) {
              e.preventDefault();
              if (!guidelineForm) return;
              try {
                const { id } = await service.createGuideline({
                  data: {
                    condition: guidelineForm.condition ?? 0,
                    options: guidelineForm.options ?? [],
                    required: guidelineForm.required ?? false,
                    id: guidelineForm.id,
                    type: guidelineForm.type,
                  },
                  departmentId,
                });
                return id;
              } catch (e) {
                console.error(e);
              }
            },
            async onClickDeleteGuideline({ guidelineId, departmentId }) {
              try {
                const { id } = await service.deleteGuideline({
                  guidelineId,
                  departmentId,
                });
                return id;
              } catch (e) {
                console.error(e);
              }
            },
          }}
        />
      );
    }
    return undefined;
  }, [
    departmentList,
    guidelineForm,
    isSubjectTabSelected,
    isUnivTabSelected,
    service,
    setDepartmentList,
    setFilter,
    setUniv,
    setUnivList,
    univList,
  ]);

  return (
    <div className="h-full">
      <UnivTabs
        ux={{
          clickTab(value) {
            setTabItem(value);
          },
        }}
      >
        {renderTabContent}
      </UnivTabs>
    </div>
  );
};

export default AdminUnivInteractor;
