import { useRecoilState } from "recoil";
import { CommonSubjectRepository, OptionalSubjectRepository } from "../../../domain/subject/school.interface";
import { AdminSubjectContext } from "../../../service/admin/subject";
import { commonSubjectListState, optionalSubjectListState } from "../../../domain/subject/school.impl";

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

  const [commonSubjectList, setCommonSubjectList] = useRecoilState(commonSubjectListState);
  const [optionalSubjectList, setOptionalSubjectList] = useRecoilState(optionalSubjectListState);

  return (
    <AdminSubjectContext.Provider value={{
      async readSubject(distinct, filter) {
        let payload;
        switch(distinct) {
          case "COMMON":
            setCommonSubjectList({
              data: [],
              loading: true
            });
            payload = await commonSubjectRepository.findBy({...filter});
            setCommonSubjectList({
              data: payload,
              loading: false
            });
            return payload.map((v) => {
              return {
                code: v.code,
                group: v.group,
                name: v.name,
                description: v.description
              }
            });
          case "OPTION":
            setOptionalSubjectList({
              data: [],
              loading: true
            })
            payload = await optionalSubjectRepository.findBy({...filter});
            setOptionalSubjectList({
              data: payload,
              loading: false
            });
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
            payload = commonSubjectList.data.find((v) => v.code === code);
            if (!payload) throw Error("NOT_FOUND");
            return {...payload};
          case "OPTION":
            payload = optionalSubjectList.data.find((v) => v.code === code);
            if (!payload) throw Error("NOT_FOUND");
            return {...payload};
        }
      },
      async editSubject(req) {
        const {distinct} = req;
        switch(distinct) {
          case "COMMON":
            await commonSubjectRepository.save(req.data, req.data.code);
            return;
        }
      },
      async addSubject(req) {
        const {distinct} = req;
        switch(distinct) {
          case "COMMON":
            await commonSubjectRepository.save({
              ...req.data,
              code: ""
            });
            return;
        }
      },
    }}>
    {children}
    </AdminSubjectContext.Provider>
  );
}

export default AdminSubjectContainer;
