import { useSetRecoilState } from "recoil";

import { MajorRepository, UnivRepository } from "../../domain/subject/univ.interface";
import { SubjectSearchContext } from "../../service/subject-search";
import { univListState } from "../../domain/subject/univ.impl";
import { majorListState } from "../../domain/subject/univ.impl";

const SubjectSearchContainer = ({
  children,
  repositories
}: {
  children?: React.ReactNode;
  repositories: {
    majorRepository: MajorRepository;
    univRepository: UnivRepository;
  };
}) => {
  const { majorRepository, univRepository } = repositories;

  const setUnivListSnapshot = useSetRecoilState(univListState);
  const setMajorListSnapshot = useSetRecoilState(majorListState);

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
        return univs.map(v => v.name);
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
        return majors.map(v => v.name);
      },
      // async search(filters) {
      //   const {univToMajor, generalMajorByClsf} = filters;
      //   if (
      //     univToMajor &&
      //     univToMajor.majorChoice &&
      //     univToMajor.univChoice
      //   ) {
          
      //   }
      // },
      // searchMore(code) {
        
      // },
    }}>
      {children}
    </SubjectSearchContext.Provider>
  );
}

export default SubjectSearchContainer;
