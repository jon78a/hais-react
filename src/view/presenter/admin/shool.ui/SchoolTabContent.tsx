import SchoolTable from "./SchoolTable";
import SchoolDetailDialog from "./SchoolDetailDialog";
import SchoolDeleteDialog from "./SchoolDeleteDialog";
import SchoolFloatButton from "./SchoolFloatButton";
import { SchoolTabContentUx } from "../school.ux/SchoolTabContentUx";
import SchoolCreateDialog from "./SchoolCreateDialog";

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
        <SchoolCreateDialog create={ux.create} />
        <SchoolDetailDialog modify={ux.modify} />
        <SchoolDeleteDialog delete={ux.delete} />
        <SchoolFloatButton />
      </SchoolTable>
    </>
  );
};

export default SchoolTabContent;
