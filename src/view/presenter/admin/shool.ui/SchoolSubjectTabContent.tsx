import { SchoolSubjectTabContentUx } from "../school.ux/SchoolSubjectTabContentUx";
import SchoolSubjectCreateDialog from "./SchoolSubjectCreateDialog";
import SchoolSubjectDeleteDialog from "./SchoolSubjectDeleteDialog";
import SchoolSubjectDetailDialog from "./SchoolSubjectDetailDialog";
import SchoolSubjectFloatButton from "./SchoolSubjectFloatButton";
import SchoolSubjectTable from "./SchoolSubjectTable";

const SchoolTabContent: React.FC<{
  ux: SchoolSubjectTabContentUx;
}> = ({ ux }) => {
  return (
    <>
      <SchoolSubjectTable
        ux={{
          inputKeyword: ux.inputKeyword,
        }}
      >
        <SchoolSubjectCreateDialog create={ux.create} />
        <SchoolSubjectDeleteDialog delete={ux.delete} />
        <SchoolSubjectDetailDialog modify={ux.modify} />
        <SchoolSubjectFloatButton />
      </SchoolSubjectTable>
    </>
  );
};

export default SchoolTabContent;
