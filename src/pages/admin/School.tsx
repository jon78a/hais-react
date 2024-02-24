import AdminSchoolInteractor from "../../view/interactor/admin/\bSchoolInteractor";
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
