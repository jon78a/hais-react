import { AdminMajorContext } from "../../../service/admin/major";
import {
  MajorRepository,
  UnivRepository,
} from "../../../domain/subject/univ.interface";
import { OptionalSubjectRepository } from "../../../domain/subject/school.interface";

const AdminMajorContainer = ({
  children,
  repositories
}: {
  children: React.ReactNode;
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
    <AdminMajorContext.Provider value={{
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
            department: major.department,
            requiredCredits: major.requiredCredits.map((v) => ({
              subjectCategory: v.subjectCategory,
              amount: v.amount.toString()
            })),
            requiredGroups: major.requiredGroups,
            difficulty: major.difficulty.toString()
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
            department: major.department,
            requiredCredits: major.requiredCredits.map((v) => ({
              subjectCategory: v.subjectCategory,
              amount: v.amount.toString()
            })),
            requiredGroups: major.requiredGroups,
            difficulty: major.difficulty.toString()
          }
        });
      },
      async readSubjectList(majorId) {
        const optionalSubjects = await optionalSubjectRepository.findByMajorId(majorId);
        return [...optionalSubjects];
      },
      async submitMajorRecruit(recruit, id) {
        if (!id) {
          return;
        }
        await majorRepository.updateRecruit({
          requiredCredits: recruit.requiredCredits.map((v) => ({
            subjectCategory: v.subjectCategory,
            amount: parseInt(v.amount)
          })),
          requiredGroups: recruit.requiredGroups,
          difficulty: parseInt(recruit.difficulty)
        }, id);
      },
    }}>
      <div className="max-w-[600px] min-w-[550px]">
        {children}
      </div>
    </AdminMajorContext.Provider>
  )
}

export default AdminMajorContainer;
