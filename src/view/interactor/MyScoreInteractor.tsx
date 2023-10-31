import { useSetRecoilState } from "recoil";

import { selectedSchoolYearState } from "../../schema/states/MyScore";
import FilterSelect from "../presenter/myScore.ui/FilterSelect";

const MyScoreInteractor = () => {
  const setSelectedSchoolYear = useSetRecoilState(selectedSchoolYearState);

  return (
    <>
      <div className="flex">
        <FilterSelect selectSchoolYear={(year) => setSelectedSchoolYear(year)}/>
      </div>
    </>
  );
};

export default MyScoreInteractor;
