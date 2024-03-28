import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { DepartmentTableContext } from "./DepartmentTableContext";
import {
  SchoolSubjectType,
  schoolSubjectTypeMap,
} from "../../../../policy/school";
import { DepartmentGuidelineDialogUx } from "../univ.ux/DepartmentGuidelineDialogUx";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  guideLineFormState,
  subjectListState,
} from "../../../../schema/states/AdminUniv";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Department } from "../../../../domain/univ/univ.interface";
import { userState } from "../../../../schema/states/User";

const DepartmentGuidelineDialog: React.FC<DepartmentGuidelineDialogUx> = (
  ux
) => {
  const context = useContext(DepartmentTableContext);
  const schoolSubjectTypes: string[] = Object.values(schoolSubjectTypeMap);

  const [guidelineForm, setGuidelineForm] = useRecoilState(guideLineFormState);

  const [subjectList, setSubjectList] = useRecoilState(subjectListState);
  const [subjectNames, setSubjectNames] = useState<string[]>([]);
  const user = useRecoilValue(userState);

  const isAdmin: boolean = Boolean(
    user?.email && context.selection.state?.admin.includes(user?.email)
  );

  const prev: Department = { ...context.selection.state! };
  const prevGuidelines = prev.guidelines ? prev.guidelines : [];

  const filteredTypes = schoolSubjectTypes.filter((type) =>
    context.selection.state?.guidelines
      ?.map((guideline) => guideline.type as string)
      ?.includes(type)
  );

  useEffect(() => {
    const fetchSubjectNames = async () => {
      if (context.selection.state?.guidelines) {
        let updatedSubjectNames: string[] = [];
        await Promise.all(
          context.selection.state.guidelines.map(async (guideline) => {
            const names = await Promise.all(
              guideline?.options?.map(async (option) => {
                const data = await ux.getSubjectList(
                  guideline.type as SchoolSubjectType
                );
                const subject = data?.find((subject) => subject.id === option);
                return subject?.name || "";
              }) || []
            );
            updatedSubjectNames = [...names];
          })
        );
        setSubjectNames(updatedSubjectNames);
      }
    };

    fetchSubjectNames();
  }, [context.selection.state?.guidelines, subjectNames, ux]);

  if (context.modal.state !== "GUIDELINE") return null;

  return (
    <Dialog
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
      open={Boolean(context.modal.state)}
      fullScreen
    >
      <DialogTitle>{context.selection.state?.name} 모집요강</DialogTitle>

      <IconButton
        onClick={() => {
          context.modal.set(null);
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        component="form"
        onSubmit={async (e) => {
          const id = await ux.guidelineFormSubmit(
            e,
            context.selection.state?.id!
          );

          if (id) {
            context.selection.set({
              ...prev,
              guidelines: [
                {
                  id,
                  condition: guidelineForm?.condition ?? 0,
                  options: guidelineForm?.options ?? [],
                  required: guidelineForm?.required ?? false,
                  type: guidelineForm?.type,
                },
                ...prevGuidelines,
              ],
            });
          }
        }}
        className="flex flex-col gap-4"
      >
        {isAdmin ? (
          <Card>
            <DialogContent>
              <Card sx={{ p: 2 }}>
                <Stack>
                  <Box className="flex flex-col space-y-4">
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            setGuidelineForm((prev) => ({
                              ...prev,
                              required: e.target.checked,
                            }));
                          }}
                        />
                      }
                      label="필수"
                    />

                    <FormControl fullWidth required>
                      <InputLabel id="type">과목</InputLabel>
                      <Select
                        id="type"
                        label="과목"
                        defaultValue="공통과목"
                        onChange={(e) => {
                          const type = e.target.value as SchoolSubjectType;
                          setGuidelineForm((prev) => ({
                            ...prev,
                            type,
                          }));

                          ux.getSubjectList(type).then((response) => {
                            setSubjectList(response ? response : []);
                          });
                        }}
                      >
                        {filteredTypes.map((subjectType) => (
                          <MenuItem key={subjectType} value={subjectType}>
                            {subjectType}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth required>
                      <InputLabel id="options">모집요강</InputLabel>
                      <Select
                        required
                        id="options"
                        placeholder={"모집요강"}
                        multiple
                        defaultValue={[]}
                        onChange={(e) => {
                          setGuidelineForm((prev) => ({
                            ...prev,
                            options: e.target.value as string[],
                          }));
                        }}
                      >
                        {subjectList?.map((subject) => (
                          <MenuItem value={subject.id}>{subject.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      id="condition"
                      label="수강해야할 과목 갯수"
                      fullWidth
                      required
                      type="number"
                      inputProps={{ min: 0 }}
                      sx={{ mt: 2 }}
                      onChange={(e) => {
                        setGuidelineForm((prev) => ({
                          ...prev,
                          condition: e.target.value as unknown as number,
                        }));
                      }}
                    />
                  </Box>
                </Stack>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button type="submit">저장</Button>
            </DialogActions>
          </Card>
        ) : null}

        <Box className="grid grid-cols-4 px-5">
          {context.selection.state?.guidelines?.map((guideline) => (
            <Card sx={{ width: 275, my: 2 }} key={guideline?.id}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  필수: {guideline?.required ? <CheckIcon /> : <ClearIcon />}
                </Typography>

                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  과목: {guideline?.type}
                </Typography>

                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  모집요강: {subjectNames?.join(", ") || "Loading..."}
                </Typography>

                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  수강해야할 과목: {guideline?.condition}
                </Typography>
              </CardContent>

              {isAdmin ? (
                <Button
                  onClick={async () => {
                    const id = await ux.onClickDeleteGuideline({
                      departmentId: context.selection.state?.id!,
                      guidelineId: guideline!.id!,
                    });

                    if (id) {
                      const updatedGuidelines = prevGuidelines.filter(
                        (guideline) => guideline.id !== id
                      );

                      context.selection.set({
                        ...prev,
                        guidelines: updatedGuidelines,
                      });
                    }
                  }}
                  color="error"
                  className="ml-auto"
                >
                  삭제
                </Button>
              ) : null}
            </Card>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

export default DepartmentGuidelineDialog;
