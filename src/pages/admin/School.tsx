import AdminSchoolInteractor from "../../view/interactor/admin/SchoolInteractor";
import AdminSchoolContainer from "../../view/container/admin/SchoolContainer";
import schoolRepository from "../../driver/repository/schoolRepository";

const AdminSchoolPage = () => {
  return (
    <AdminSchoolContainer
      repositories={{
        schoolRepository,
      }}
    >
      <AdminSchoolInteractor />
    </AdminSchoolContainer>
  );
};

export default AdminSchoolPage;
