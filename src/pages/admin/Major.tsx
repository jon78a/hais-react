import AdminMajorContainer from "../../view/container/admin/MajorContainer";
import AdminMajorInteractor from "../../view/interactor/admin/MajorInteractor";
import majorRepository from "../../driver/repository/majorRepository";
import univRepository from "../../driver/repository/univRepository";
import optionalSubjectRepository from "../../driver/repository/optionalSubjectRepository";

const AdminMajorPage = () => {
  return (
    <AdminMajorContainer
      repositories={{
        majorRepository,
        univRepository,
        optionalSubjectRepository
      }}
    >
      <AdminMajorInteractor />
    </AdminMajorContainer>
  );
}

export default AdminMajorPage;
