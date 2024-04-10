import { AdminPremiumContext } from "../../../service/admin/premium";

const AdminPremiumContainer = ({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories: {};
}) => {
  // const { univRepository, schoolRepository, departmentRepository } =
  //   repositories;

  return (
    <AdminPremiumContext.Provider value={{}}>
      {children}
    </AdminPremiumContext.Provider>
  );
};

export default AdminPremiumContainer;
