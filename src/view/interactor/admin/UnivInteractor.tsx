import { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

import {
  departmentListState,
  univFilterState,
  univListState,
  univState,
  univTabState,
} from "../../../schema/states/AdminUniv";
import { useAdminUnivService } from "../../../service/admin/univ";
import UnivTabContent from "../../presenter/admin/univ.ui/UnivTabContent";
import UnivTabs from "../../presenter/admin/univ.ui/UnivTabs";
import DepartmentTabContent from "../../presenter/admin/univ.ui/DepartmentTabContent";

const AdminUnivInteractor = () => {
  const [tabItem, setTabItem] = useRecoilState(univTabState);
  const [filter, setFilter] = useRecoilState(univFilterState);
  const [univList, setUnivList] = useRecoilState(univListState);
  const setUniv = useSetRecoilState(univState);
  const [departmentList, setDepartmentList] =
    useRecoilState(departmentListState);

  const isUnivTabSelected = tabItem === "UNIV";
  const isSubjectTabSelected = tabItem === "DEPARTMENT";

  const service = useAdminUnivService();

  useEffect(() => {
    service.getUnivList(filter).then((data) => {
      setUnivList(data);
    });

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
  }, [
    filter,
    isSubjectTabSelected,
    isUnivTabSelected,
    service,
    setDepartmentList,
    setUnivList,
    univList,
  ]);

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
              service.editUniv(form).then(() => {
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
              service.addUniv(form).then(({ id }) => {
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
              service.addDepartment(req).then(({ id }) => {
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
              service.editDepartment(form).then(() => {
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
                return data;
              });
            },
          }}
        />
      );
    }
    return undefined;
  }, [
    departmentList,
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
