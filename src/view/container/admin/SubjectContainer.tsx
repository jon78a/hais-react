import { CommonSubjectRepository, OptionalSubjectRepository } from "../../../domain/subject/school.interface";
import { AdminSubjectContext } from "../../../service/admin/subject";

const AdminSubjectContainer = ({
  children,
  repositories
}: {
  children: React.ReactNode,
  repositories: {
    optionalSubjectRepository: OptionalSubjectRepository,
    commonSubjectRepository: CommonSubjectRepository
  }
}) => {
  const {
    optionalSubjectRepository,
    commonSubjectRepository
  } = repositories;
  return (
    <AdminSubjectContext.Provider value={{
      async readSubject(distinct, filter) {
        let payload;
        switch(distinct) {
          case "COMMON":
            payload = await commonSubjectRepository.findBy({...filter});
            return payload.map((v) => {
              return {
                code: v.code,
                group: v.group,
                name: v.name,
                description: v.description
              }
            });
          case "OPTION":
            payload = await optionalSubjectRepository.findBy({...filter});
            return payload.map((v) => {
              return {
                code: v.code,
                group: v.group,
                name: v.name,
                description: v.description
              }
            });
        }
      },
      async readSubjectProfile(code, distinct) {
        let payload;
        switch(distinct) {
          case "COMMON":
            payload = await commonSubjectRepository.findByCode(code);
            if (payload === null) throw Error("NOT_FOUND");
            return {...payload};
            case "OPTION":
            payload = await optionalSubjectRepository.findByCode(code);
            if (payload === null) throw Error("NOT_FOUND");
            return {...payload};
        }
      },
      async editSubject(req) {
        
      },
    }}>
    {children}
    </AdminSubjectContext.Provider>
  );
}

export default AdminSubjectContainer;
