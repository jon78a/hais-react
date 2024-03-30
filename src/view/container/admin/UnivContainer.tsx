import { SchoolRepository } from "../../../domain/school/school.interface";
import {
  DepartmentRepository,
  Guideline,
  UnivRepository,
} from "../../../domain/univ/univ.interface";
import { AdminUnivContext } from "../../../service/admin/univ";

const AdminUnivContainer = ({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories: {
    univRepository: UnivRepository;
    schoolRepository: SchoolRepository;
    departmentRepository: DepartmentRepository;
  };
}) => {
  const { univRepository, schoolRepository, departmentRepository } =
    repositories;

  return (
    <AdminUnivContext.Provider
      value={{
        async getUnivList(filter) {
          const payload = await univRepository.findBy({ ...filter });
          return payload;
        },
        async addUniv(req) {
          const payload = await univRepository.save(req.data);
          return payload;
        },
        async deleteUniv(req) {
          if (!req.id) return;
          await univRepository.delete(req.id);
        },
        async editUniv(req) {
          if (!req.data) return;
          await univRepository.save(req.data, req.data.id);
        },
        async getUniv(id) {
          const payload = await univRepository.findById(id);
          return payload;
        },
        async getDepartmentList(filter) {
          const payload = await departmentRepository.findBy({ ...filter });
          return payload;
        },
        async addDepartment(req) {
          const payload = await departmentRepository.save({
            id: req.data.id,
            name: req.data.name,
            keyword: req.data.keyword,
            universityId: req.data.universityId,
            precedences: req.data?.precedences,
            admin: req.data.admin,
          });
          return payload;
        },
        async editDepartment(req) {
          if (!req.data) return;
          await departmentRepository.save(
            {
              id: req.data.id,
              name: req.data.name,
              keyword: req.data.keyword,
              universityId: req.data.universityId,
              precedences: req.data.precedences,
              // guidelines: req.data.guidelines.filter(
              //   (value): value is Guideline => Boolean(value)
              // ),
              admin: req.data.admin,
            },
            req.data.id
          );
        },
        async deleteDepartment(req) {
          if (!req.id) return;
          await departmentRepository.delete(req.id);
        },
        async getSubjectList(type) {
          const payload = await schoolRepository.findSubjectByType(type);
          return payload;
        },
        async createGuideline(req) {
          const payload = await departmentRepository.createGuideline(req);
          return payload;
        },
        async deleteGuideline(req) {
          const payload = await departmentRepository.deleteGuideline(req);
          return payload;
        },
      }}
    >
      {children}
    </AdminUnivContext.Provider>
  );
};

export default AdminUnivContainer;
