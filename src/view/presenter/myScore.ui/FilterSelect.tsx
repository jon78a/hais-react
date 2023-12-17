import { FilterSelectUx } from "../myScore.ux/FilterSelectUx";
import type { SubjectLabel } from "../../../schema/types/MyScore";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilValue } from "recoil";
import { subjectLabelState } from "../../../schema/states/MyScore";

const FilterSelect: React.FC<FilterSelectUx> = (ux) => {
  const subjectLabel = useRecoilValue(subjectLabelState);

  const handleChange = (event: SelectChangeEvent) => {
    ux.selectSubjectLabel(event.target.value as SubjectLabel);
  };

  return (
    <FormControl sx={{
      minWidth: 120
    }}>
      <InputLabel>과목분류</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="과목분류"
        value={subjectLabel}
        onChange={handleChange}
        size={"small"}
      >
        <MenuItem value={'공통과목'}>공통과목</MenuItem>
        <MenuItem value={'선택과목'}>선택과목</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
