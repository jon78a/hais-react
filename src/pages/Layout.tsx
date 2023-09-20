import { Outlet } from "react-router-dom";

import { BaseContainer } from "../view/container/BaseContainer";
import authRepository from "../driver/repository/authRepository";

export default function Layout() {
  return (
    <BaseContainer
      repositories={{
        authRepository
      }}
    >
      <Outlet />
    </BaseContainer>
  )
}
