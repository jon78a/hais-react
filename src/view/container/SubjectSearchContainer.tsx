import { useSetRecoilState, useRecoilState } from "recoil";

import { MajorRepository, UnivRepository } from "../../domain/subject/univ.interface";
import { OptionalSubjectRepository } from "../../domain/subject/school.interface";
import { SubjectSearchContext } from "../../service/subject-search";
import { univListState } from "../../domain/subject/univ.impl";
import { majorListState } from "../../domain/subject/univ.impl";
import { optionalSubjectListState } from "../../domain/subject/school.impl";

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

  const setUnivListSnapshot = useSetRecoilState(univListState);
  const setMajorListSnapshot = useSetRecoilState(majorListState);
  const [optionalSubjectListSnapshot,setOptionalSubjectListSnapshot] = useRecoilState(optionalSubjectListState);

  return (
    <SubjectSearchContext.Provider value={{
      async showUnivs(keyword) {
        setUnivListSnapshot({
          data: [],
          loading: true
        });
        const univs = await univRepository.findByNameLike(keyword);
        setUnivListSnapshot({
          data: univs,
          loading: false
        });
        return univs.map(v => {
          return {
            id: v.id,
            name: v.name
          }
        });
      },
      async showMajors(keyword, univName) {
        setMajorListSnapshot({
          data: [],
          loading: true
        })
        const majors = await majorRepository.findByNameLikeWithUniv(keyword, univName);
        setMajorListSnapshot({
          data: majors,
          loading: false
        })
        return majors.map(v => {
          return {
            id: v.id,
            name: v.name
          }
        });
      },
      async search(filters) {
        const {univToMajor} = filters;
        const majorId = univToMajor.majorChoice.id
        setOptionalSubjectListSnapshot({
          data: [],
          loading: true
        });
        const optionalSubjects = await optionalSubjectRepository.findByMajorId(majorId);
        setOptionalSubjectListSnapshot({
          data: optionalSubjects,
          loading: false
        });
        return optionalSubjects.map((v) => {
          return {
            code: v.code,
            sbjName: v.name,
            subjectCategory: v.subjectCategory,
            group: v.group,
            suneungOX: v.suneungInfo === "수능 출제 과목 아님" ? "X" : "O"
          }
        })
      },
      async searchMore(code) {
        const optionalSubject = optionalSubjectListSnapshot.data.find((v) => v.code===code);
        return {
          description: optionalSubject?.description || "",
          etcInfo: optionalSubject?.etcInfo || "",
        }
      },
    }}>
      {children}
    </SubjectSearchContext.Provider>
  );
}

export default SubjectSearchContainer;
