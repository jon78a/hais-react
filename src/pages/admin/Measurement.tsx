import MeasurementContainer from "../../view/container/admin/MeasurementContainer";
import MeasurementInteractor from "../../view/interactor/admin/MeasurementInteractor";
import commonSubjectWeightRepository from "../../driver/repository/commonSubjectWeightRepository";
import gradeScoreWeightRepository from "../../driver/repository/gradeScoreWeightRepository";
import commonSubjectRepository from "../../driver/repository/commonSubjectRepository";

const AdminMeasurementPage = () => {
  return (
    <MeasurementContainer
      repositories={{
        commonSubjectWeightRepository,
        gradeScoreWeightRepository,
        commonSubjectRepository
      }}
    >
      <MeasurementInteractor />
    </MeasurementContainer>
  );
};

export default AdminMeasurementPage;
