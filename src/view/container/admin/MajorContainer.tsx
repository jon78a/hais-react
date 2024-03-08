import { AdminMajorContext } from "../../../service/admin/major";
import {
  MajorRepository,
  UnivRepository,
} from "../../../domain/subject/univ.interface";
import { OptionalSubjectRepository } from "../../../domain/subject/school.interface";
import departmentRepository from "../../../driver/repository/v2/departmentRepository";

const AdminMajorContainer = ({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories: {
    majorRepository: MajorRepository;
    univRepository: UnivRepository;
    optionalSubjectRepository: OptionalSubjectRepository;
  };
}) => {
  const { majorRepository, univRepository, optionalSubjectRepository } =
    repositories;

  return (
    <AdminMajorContext.Provider
      value={{
        async suggestUniv(univKeyword) {
          const univs = await univRepository.findByNameLike(univKeyword);
          return univs.map((univ) => {
            return {
              id: univ.id,
              name: univ.name,
            };
          });
        },
        async searchByUnivOrMajor(fullNameKeyword) {
          const majors = await majorRepository.findByUnivOrMajorName(
            fullNameKeyword
          );
          return majors.map((major) => {
            return {
              id: major.id,
              name: major.name,
              univ: major.univ,
              department: major.department,
              requiredGroups: major.requiredGroups,
              difficulty: major.difficulty.toString(),
            };
          });
        },
        async getDepartmentOnUniv(name, univId) {
          const departments = await departmentRepository.findByUnivId(
            name,
            univId
          );
          return departments.map((department) => ({
            id: department.id,
            name: department.name,
            guidelines: department.guidelines,
            precedences: department.precedences,
            universityId: department.universityId,
            keyword: department.keyword,
          }));
        },
        async readSubjectList(majorId) {
          const optionalSubjects =
            await optionalSubjectRepository.findByMajorId(majorId);
          return [...optionalSubjects];
        },
        async submitMajorRecruit(recruit, id) {
          if (!id) {
            return;
          }
          await majorRepository.updateRecruit(
            {
              requiredGroups: recruit.requiredGroups,
              difficulty: parseInt(recruit.difficulty),
            },
            id
          );
        },
      }}
    >
      <div className="max-w-[600px] min-w-[550px]">{children}</div>
    </AdminMajorContext.Provider>
  );
};

export default AdminMajorContainer;
