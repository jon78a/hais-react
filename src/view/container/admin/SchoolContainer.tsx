import { SchoolRepository } from "../../../domain/school/school.interface";
import { AdminSchoolContext } from "../../../service/admin/school";

const AdminSchoolContainer = ({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories: {
    schoolRepository: SchoolRepository;
  };
}) => {
  const { schoolRepository } = repositories;

  return (
    <AdminSchoolContext.Provider
      value={{
        async getSchoolList(filter) {
          const payload = await schoolRepository.findBy({ ...filter });
          return payload;
        },
        async getSchool(id) {
          const payload = await schoolRepository.findById(id);
          return payload;
        },
        async addSchool(req) {
          const payload = await schoolRepository.save(req.data);
          return payload;
        },
        async deleteSchool(req) {
          if (!req.id) return;
          await schoolRepository.delete(req.id);
        },
        async editSchool(req) {
          if (!req.data) return;
          await schoolRepository.save(req.data, req.data.id);
        },
      }}
    >
      {children}
    </AdminSchoolContext.Provider>
  );
};

export default AdminSchoolContainer;
