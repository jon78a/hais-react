import { Outlet } from "react-router-dom";

import { BaseContainer } from "../view/container/BaseContainer";
import authSessionRepository from "../driver/repository/authSessionRepository";

export default function Layout() {
  return (
    <BaseContainer
      repositories={{
        authSessionRepository
      }}
    >
      <Outlet />
    </BaseContainer>
  )
}
