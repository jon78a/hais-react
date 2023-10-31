import { FilterSelectUx } from "../myScore.ux/FilterSelectUx";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilValue } from "recoil";
import { selectedSchoolYearState } from "../../../schema/states/MyScore";

const FilterSelect: React.FC<FilterSelectUx> = (ux) => {
  const year = useRecoilValue(selectedSchoolYearState);

  const handleChange = (event: SelectChangeEvent) => {
    ux.selectSchoolYear(Number(event.target.value));
  };

  return (
    <FormControl sx={{
      minWidth: 120
    }}>
      <InputLabel>학년</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={String(year)}
        label="year"
        onChange={handleChange}
        size={"small"}
      >
        <MenuItem value={'1'}>1학년</MenuItem>
        <MenuItem value={'2'}>2학년</MenuItem>
        <MenuItem value={'3'}>3학년</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
