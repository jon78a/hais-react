import UnivTable from "./UnivTable";
import UnivDetailDialog from "./UnivDetailDialog";
import UnivDeleteDialog from "./UnivDeleteDialog";
import UnivFloatButton from "./UnivFloatButton";
import { UnivTabContentUx } from "../univ.ux/UnivTabContentUx";
import UnivCreateDialog from "./UnivCreateDialog";

const UnivTabContent: React.FC<{
  ux: UnivTabContentUx;
}> = ({ ux }) => {
  return (
    <UnivTable
      ux={{
        clickRow: ux.clickRow,
        inputKeyword: ux.inputKeyword,
      }}
    >
      <UnivCreateDialog create={ux.create} />
      <UnivDetailDialog modify={ux.modify} />
      <UnivDeleteDialog delete={ux.delete} />
      <UnivFloatButton />
    </UnivTable>
  );
};

export default UnivTabContent;
