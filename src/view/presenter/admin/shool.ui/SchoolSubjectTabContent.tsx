import { SchoolSubjectTabContentUx } from "../school.ux/SchoolSubjectTabContentUx";
import SchoolSubjectTable from "./SchoolSubjectTable";

const SchoolTabContent: React.FC<{
  ux: SchoolSubjectTabContentUx;
}> = ({ ux }) => {
  return (
    <>
      <SchoolSubjectTable
        ux={{
          clickRow: ux.clickRow,
          inputKeyword: ux.inputKeyword,
        }}
      ></SchoolSubjectTable>
    </>
  );
};

export default SchoolTabContent;
