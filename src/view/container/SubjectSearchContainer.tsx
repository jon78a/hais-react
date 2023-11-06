import { MajorRepository, UnivRepository } from "../../domain/subject/univ.interface";
import { OptionalSubjectRepository } from "../../domain/subject/school.interface";
import { SubjectSearchContext } from "../../service/subject-search";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const SubjectSearchContainer = ({
  children,
  repositories
}: {
  children?: React.ReactNode;
  repositories: {
    majorRepository: MajorRepository;
    univRepository: UnivRepository;
    optionalSubjectRepository: OptionalSubjectRepository;
  };
}) => {
  const {
    majorRepository,
    univRepository,
    optionalSubjectRepository
  } = repositories;

  return (
    <SubjectSearchContext.Provider value={{
      async suggestUniv(univKeyword) {
        const univs = await univRepository.findByNameLike(univKeyword);
        return univs.map((univ) => {
          return {
            id: univ.id,
            name: univ.name
          }
        });
      },
      async searchByUnivOrMajor(fullNameKeyword) {
        const majors = await majorRepository.findByUnivOrMajorName(fullNameKeyword);
        return majors.map((major) => {
          return {
            id: major.id,
            name: major.name,
            univ: major.univ,
            department: major.department
          }
        })
      },
      async searchByMajorKeywordOnUnivName(majorKeyword, univName) {
        const majors = await majorRepository.findByNameLikeWithUniv(majorKeyword, univName);
        return majors.map((major) => {
          return {
            id: major.id,
            name: major.name,
            univ: major.univ,
            department: major.department
          }
        });
      },
      async readSubjectList(majorId) {
        const optionalSubjects = await optionalSubjectRepository.findByMajorId(majorId);
        return [...optionalSubjects];
      },
    }}>
      <Container maxWidth={"md"} component={Paper}>
        {children}
      </Container>
    </SubjectSearchContext.Provider>
  );
}

export default SubjectSearchContainer;
