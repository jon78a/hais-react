import AdminSubjectContainer from "../../view/container/admin/SubjectContainer";
import AdminSubjectInteractor from "../../view/interactor/admin/SubjectInteractor";
import commonSubjectRepository from "../../driver/repository/commonSubjectRepository";
import optionalSubjectRepository from "../../driver/repository/optionalSubjectRepository";

const AdminSubjectPage = () => {
  return (
    <AdminSubjectContainer
      repositories={{
        commonSubjectRepository,
        optionalSubjectRepository
      }}
    >
      <AdminSubjectInteractor/>
    </AdminSubjectContainer>
  );
}

export default AdminSubjectPage;
