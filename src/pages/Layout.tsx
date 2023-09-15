import { Outlet } from "react-router-dom";
import { BaseContainer } from "../view/container/BaseContainer";

export default function Layout() {
  return (
    <BaseContainer>
      <Outlet />
    </BaseContainer>
  )
}
