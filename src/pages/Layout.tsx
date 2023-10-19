import { Outlet } from "react-router-dom";

import { BaseContainer } from "../view/container/BaseContainer";
import AdminBaseContainer from "../view/container/admin/BaseContainer";
import authSessionRepository from "../driver/repository/authSessionRepository";
import authRepository from "../driver/repository/authRepository";
import userRepository from "../driver/repository/userRepository";

export default function Layout() {
  return (
    <BaseContainer
      repositories={{
        authSessionRepository,
        authRepository,
        userRepository
      }}
    >
      <Outlet />
    </BaseContainer>
  );
}

export const AdminLayout = () => {
  return (
    <AdminBaseContainer>
      <Outlet />
    </AdminBaseContainer>
  );
}
