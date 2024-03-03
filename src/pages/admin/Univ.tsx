import AdminUnivInteractor from "../../view/interactor/admin/UnivInteractor";
import AdminUnivContainer from "../../view/container/admin/UnivContainer";
import univRepository from "../../driver/repository/v2/univRepository";
import schoolRepository from "../../driver/repository/schoolRepository";
import departmentRepository from "../../driver/repository/v2/departmentRepository";

const AdminUniversityPage = () => {
  return (
    <AdminUnivContainer
      repositories={{
        univRepository,
        schoolRepository,
        departmentRepository,
      }}
    >
      <AdminUnivInteractor />
    </AdminUnivContainer>
  );
};

export default AdminUniversityPage;
