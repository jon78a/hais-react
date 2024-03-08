import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { GuidelineFormUx } from "../univ.ux/GuidelineFormUx";
import {
  SchoolSubjectType,
  schoolSubjectTypeMap,
} from "../../../../policy/school";
import { GuidelineDto } from "../../../../schema/types/AdminUniv";
import { RemoveCircle } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { SchoolSubjectDto } from "../../../../schema/types/AdminSchool";
import { DepartmentTableContext } from "./DepartmentTableContext";

export default function GuidelineForm({
  state,
  getSubjectList,
  index,
}: GuidelineFormUx) {
  const context = useContext(DepartmentTableContext);
  const [subjectList, setSubjectList] = useState<SchoolSubjectDto[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (context.modal.state !== "UPDATE") return undefined;
    if (!state.form.get.data?.guidelines[index]) return undefined;

    setLoading(true);
    getSubjectList(
      state.form.get.data?.guidelines?.[index]?.type as SchoolSubjectType
    ).then((subjects) => {
      if (subjects) setSubjectList(subjects);
    }).finally(()=>{
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only in rendering at first
  }, [context.modal.state]);

  if (!state.form.get.data?.guidelines[index]) return null;

  return (
    <Card sx={{ p: 2 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => {
              if (!state.form.get.data || !state.form.get.data.guidelines) {
                return state.form.get;
              }

              const updatedGuidelines = [...state.form.get.data.guidelines]; // Create a copy of the guidelines array
              updatedGuidelines[index] = undefined;

              const newData = {
                ...state.form.get.data,
                guidelines: updatedGuidelines,
              };

              state.form.get.data &&
                state.form.set({
                  ...state.form.get,
                  data: newData,
                });
            }}
          >
            <RemoveCircle fontSize="inherit" />
          </IconButton>
        </Stack>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={
                  state.form.get.data?.guidelines?.[index]?.required
                }
                value={state.form.get.data?.guidelines?.[index]?.required}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  state.form.set((prevForm) => {
                    if (!prevForm?.data) return prevForm; // Return previous state if data is undefined

                    const updatedGuidelines = [...prevForm.data.guidelines]; // Create a copy of the guidelines array

                    if (updatedGuidelines[index]) {
                      updatedGuidelines[index] = {
                        ...updatedGuidelines[index]!,
                        required: e.target.checked as GuidelineDto["required"],
                      };
                    }

                    return {
                      ...prevForm,
                      data: {
                        ...prevForm.data,
                        guidelines: updatedGuidelines,
                      },
                    };
                  });
                }}
              />
            }
            label="필수"
          />
          <FormControl fullWidth sx={{ mt: 2 }} required>
            <InputLabel id="과목">과목</InputLabel>
            {loading ? (
              <Skeleton variant="rectangular" width={488} height={56} />
            ) : (
              <Select
                required
                labelId="과목"
                label={"과목"}
                value={state.form.get.data?.guidelines[index]?.type || ""}
                onChange={(e: SelectChangeEvent) => {
                  setLoading(true);
                  state.form.set((prevForm) => {
                    if (!prevForm?.data) return prevForm; // Return previous state if data is undefined

                    const updatedGuidelines = [...prevForm.data.guidelines]; // Create a copy of the guidelines array

                    if (updatedGuidelines[index]) {
                      updatedGuidelines[index] = {
                        ...updatedGuidelines[index]!,
                        type: e.target.value as GuidelineDto["type"],
                        options: [],
                      };
                    }

                    return {
                      ...prevForm,
                      data: {
                        ...prevForm.data,
                        guidelines: updatedGuidelines,
                      },
                    };
                  });

                  getSubjectList(e.target.value as SchoolSubjectType).then(
                    (subjects) => {
                      if (subjects) setSubjectList(subjects);
                    }
                  ).finally(()=>{
                    setLoading(false);
                  });
                }}
              >
                {Object.values(schoolSubjectTypeMap).map((subjectType) => (
                  <MenuItem key={subjectType} value={subjectType}>
                    {subjectType}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }} required>
            <InputLabel id="모집요강">모집요강</InputLabel>
            <Select
              required
              labelId="모집요강"
              label={"모집요강"}
              value={state.form.get.data?.guidelines[index]?.options ?? []}
              multiple
              onChange={(e: SelectChangeEvent<string[]>) => {
                state.form.set((prevForm) => {
                  if (!prevForm?.data) return prevForm; // Return previous state if data is undefined

                  const updatedGuidelines = [...prevForm.data.guidelines]; // Create a copy of the guidelines array

                  if (updatedGuidelines[index]) {
                    // Update options of the guideline at the specified index
                    updatedGuidelines[index] = {
                      ...updatedGuidelines[index]!,
                      options: e.target.value as GuidelineDto["options"],
                    };
                  }

                  return {
                    ...prevForm,
                    data: {
                      ...prevForm.data,
                      guidelines: updatedGuidelines,
                    },
                  };
                });
              }}
            >
              {subjectList?.map((subject) => (
                <MenuItem value={subject.id}>
                  <Checkbox
                    checked={
                      (
                        state.form.get.data?.guidelines[index]?.options || []
                      ).indexOf(subject.id) > -1
                    }
                  />
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="수강해야할 과목 갯수"
            fullWidth
            required
            type="number"
            inputProps={{ min: 0 }}
            value={state.form.get.data?.guidelines[index]?.condition}
            sx={{ mt: 2 }}
            onChange={(e) =>
              state.form.set((prevForm) => {
                if (!prevForm?.data) return prevForm; // Return previous state if data is undefined

                const updatedGuidelines = [...prevForm.data.guidelines]; // Create a copy of the guidelines array

                if (updatedGuidelines[index]) {
                  // Update options of the guideline at the specified index
                  updatedGuidelines[index] = {
                    ...updatedGuidelines[index]!,
                    condition: e.target.value as unknown as number,
                  };
                }

                return {
                  ...prevForm,
                  data: {
                    ...prevForm.data,
                    guidelines: updatedGuidelines,
                  },
                };
              })
            }
          />
        </Box>
      </Stack>
    </Card>
  );
}
