import { useRecoilState } from "recoil";

import { CommonSubjectRepository, OptionalSubjectRepository } from "../../../domain/subject/school.interface";
import { AdminSubjectContext } from "../../../service/admin/subject";
import { commonSubjectListState, optionalSubjectListState } from "../../../domain/subject/school.impl";
import type { CommonSubjectDto, OptionalSubjectDetail, OptionalSubjectDto } from "../../../schema/types/AdminSubject";

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
                id: Number(v.code),
                distinctDetail: "공통과목",
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
                id: Number(v.code),
                distinctDetail: v.subjectCategory,
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
          case "OPTION":
            let data = req.data as OptionalSubjectDetail;
            await optionalSubjectRepository.save({
              code: data.code,
              group: data.group,
              studentCategory: data.studentCategory,
              name: data.name,
              description: data.description,
              etcInfo: data.etcInfo,
              subjectCategory: data.subjectCategory,
              suneungInfo: data.suneungInfo,
              difficulty: parseInt(data.difficulty)
            }, data.code);
            return;
        }
      },
      async addSubject(req) {
        const {distinct} = req;
        let data;
        switch(distinct) {
          case "COMMON":
            data = req.data as CommonSubjectDto;
            await commonSubjectRepository.save({
              ...data,
              code: ""
            });
            return;
          case "OPTION":
            data = req.data as OptionalSubjectDto;
            await optionalSubjectRepository.save({
              ...data,
              difficulty: parseInt(data.difficulty),
              code: ""
            });
            return;
        }
      },
      async deleteSubject(req) {
        const {distinct} = req;
        switch(distinct) {
          case "COMMON":
            await commonSubjectRepository.delete(req.subjectCode);
            return;
          case "OPTION":
            await optionalSubjectRepository.delete(req.subjectCode);
            return;
        }
      },
    }}>
    {children}
    </AdminSubjectContext.Provider>
  );
}

export default AdminSubjectContainer;
