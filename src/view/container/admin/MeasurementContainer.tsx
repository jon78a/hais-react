import {
  CommonSubjectRepository,
  CommonSubjectWeightRepository,
  GradeScoreWeightRepository
} from "../../../domain/subject/school.interface";
import { MeasurementContext } from "../../../service/admin/measurement";

import Container from "@mui/material/Container";

const MeasurementContainer = ({
  children,
  repositories
}: {
  children: React.ReactNode;
  repositories: {
    commonSubjectWeightRepository: CommonSubjectWeightRepository;
    gradeScoreWeightRepository: GradeScoreWeightRepository;
    commonSubjectRepository: CommonSubjectRepository;
  }
}) => {
  const {
    commonSubjectWeightRepository,
    gradeScoreWeightRepository,
    commonSubjectRepository
  } = repositories;

  return (
    <MeasurementContext.Provider value={{
      async readScoreWeightList() {
        const data = await gradeScoreWeightRepository.findAll();
        return data.map((v) => {
          return {
            ...v,
            weight: v.weight
          }
        })
      },
      async readSubjectWeightList() {
        const data = await commonSubjectWeightRepository.findAll();
        const commonSubjectList = await commonSubjectRepository.findBy({nameKeyword: ''});
        return commonSubjectList.map((detail) => {
          const weight = data.find((v) => v.subjectCode === detail.code)?.weight;
          return {
            subject: {
              code: detail.code,
              category: "공통과목",
              group: detail.group,
              name: detail.name
            },
            weight: weight || 0
          }
        })
      },
      async editScoreWeight(form) {
        await gradeScoreWeightRepository.save({
          scoreType: form.scoreType,
          weight: Number(form.value)
        });
      },
      async editSubjectWeight(form) {
        await commonSubjectWeightRepository.save({
          subjectCode: form.subjectCode,
          weight: Number(form.value)
        });
      },
    }}>
      <Container maxWidth={"md"}>
        {children}
      </Container>
    </MeasurementContext.Provider>
  );
};

export default MeasurementContainer;
