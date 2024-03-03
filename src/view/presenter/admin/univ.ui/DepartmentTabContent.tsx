import { DepartmentTabContentUx } from "../univ.ux/DepartmentTabContentUx";
import DepartmentCreateDialog from "./DepartmentCreateDialog";
import DepartmentDeleteDialog from "./DepartmentDeleteDialog";
import DepartmentDetailDialog from "./DepartmentDetailDialog";
import DepartmentFloatButton from "./DepartmentFloatButton";
import DepartmentTable from "./DepartmentTable";

const DepartmentTabContent: React.FC<{
  ux: DepartmentTabContentUx;
}> = ({ ux }) => {
  return (
    <DepartmentTable
      ux={{
        inputKeyword: ux.inputKeyword,
      }}
    >
      <DepartmentCreateDialog
        create={ux.create}
        getSubjectList={ux.getSubjectList}
      />
      <DepartmentDeleteDialog delete={ux.delete} />
      <DepartmentDetailDialog
        modify={ux.modify}
        getSubjectList={ux.getSubjectList}
      />
      <DepartmentFloatButton />
    </DepartmentTable>
  );
};

export default DepartmentTabContent;
