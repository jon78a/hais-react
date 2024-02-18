import SchoolTable from "./SchoolTable";
import SchoolDetailDialog from "./SchoolDetailDialog";
import SchoolDeleteDialog from "./SchoolDeleteDialog";
import SchoolFloatButton from "./SchoolFloatButton";
import { SchoolTabContentUx } from "../school.ux/SchoolTabContentUx";

const SchoolTabContent: React.FC<{
  ux: SchoolTabContentUx;
}> = ({ ux }) => {
  return (
    <>
      <SchoolTable
        ux={{
          clickRow: ux.clickRow,
          inputKeyword: ux.inputKeyword,
        }}
      >
        <SchoolDetailDialog modify={ux.modify} />
        <SchoolDeleteDialog delete={ux.delete} />
      </SchoolTable>
      <SchoolFloatButton
        uploadExcel={ux.uploadExcel}
        sampleExcelLink={ux.sampleExcelLink}
      />
    </>
  );
};

export default SchoolTabContent;
