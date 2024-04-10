import AdminPremiumInteractor from "../../view/interactor/admin/PremiumInteractor";
import AdminPremiumContainer from "../../view/container/admin/PremiumContainer";

const AdminPremium = () => {
  return (
    <AdminPremiumContainer repositories={{}}>
      <AdminPremiumInteractor />
    </AdminPremiumContainer>
  );
};

export default AdminPremium;
