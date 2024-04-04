import Select from "@mui/material/Select";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  schoolListState,
  selectedSchoolIdState,
  studentState,
} from "../../../schema/states/MyScore";
import { SchoolSelectUx } from "../myScore.ux/SchoolSelectUx";
import { Autocomplete, TextField } from "@mui/material";

const SchoolSelect: React.FC<SchoolSelectUx> = (ux) => {
  const schoolList = useRecoilValue(schoolListState);
  const student = useRecoilValue(studentState);
  const [selectedSchoolId, setSelectedSchool] = useRecoilState(
    selectedSchoolIdState
  );

  const handleChange = (selectedId: string) => {
    setSelectedSchool(selectedId);
    ux.onChangeSchool(selectedId);
  };

  if (ux.loading)
    return <Select label="학교" sx={{ minWidth: 120 }} size="small" />;

  return (
    <Autocomplete
      sx={{
        minWidth: 240,
      }}
      options={schoolList}
      getOptionLabel={(option) => option.name}
      value={
        schoolList.find((school) => school.id === selectedSchoolId) ||
        schoolList.find((school) => school.id === student?.schoolId) ||
        null
      }
      onChange={(event, newValue) => {
        const selectedId = newValue ? newValue.id : null;
        if (selectedId) handleChange(selectedId);
      }}
      renderInput={(params) => (
        <TextField {...params} label="학교" variant="outlined" size="small" />
      )}
    />
  );
};

export default SchoolSelect;
