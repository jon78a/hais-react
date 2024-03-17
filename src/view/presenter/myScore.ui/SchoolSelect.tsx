import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  schoolListState,
  selectedSchoolIdState,
  studentState,
} from "../../../schema/states/MyScore";
import { SchoolSelectUx } from "../myScore.ux/SchoolSelectUx";

const SchoolSelect: React.FC<SchoolSelectUx> = (ux) => {
  const schoolList = useRecoilValue(schoolListState);
  const student = useRecoilValue(studentState);
  const [selectedSchoolId, setSelectedSchool] = useRecoilState(
    selectedSchoolIdState
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSchool(event.target.value as string);
    ux.onChangeSchool(event.target.value as string);
  };

  if (ux.loading)
    return <Select label="학교" sx={{ minWidth: 120 }} size="small" />;

  return (
    <FormControl
      sx={{
        minWidth: 120,
      }}
    >
      <InputLabel>내 학교</InputLabel>
      <Select
        label="학교"
        defaultValue={student?.schoolId}
        value={selectedSchoolId}
        onChange={handleChange}
        size={"small"}
      >
        {schoolList.map((_school) => (
          <MenuItem key={_school.id} value={_school.id}>
            {_school.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SchoolSelect;
