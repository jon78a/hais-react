import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { BaseContainer } from "../view/container/BaseContainer";
import AdminBaseContainer from "../view/container/admin/BaseContainer";
import authSessionRepository from "../driver/repository/authSessionRepository";
import authRepository from "../driver/repository/authRepository";
import userRepository from "../driver/repository/userRepository";
import NotFound from "./NotFound";

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
  const [reject, setReject] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    authSessionRepository.find()
      .then((session) => {
        const current = Math.floor(Date.now() / 1000);
        if (!!session && session.exp > current && session.status === "GRANT") {
          userRepository.findByUserId(session.userId)
            .then((user) => {
              if (!user) { setReject(true) }
              setReject(!user?.isAdmin);
            })
        } else { setReject(true) }
      });
  }, []);

  if (typeof reject === "undefined") return <></>;
  return reject ? <NotFound /> : (
    <AdminBaseContainer
      repositories={{
        authSessionRepository,
        authRepository,
        userRepository
      }}
    >
      <Outlet />
    </AdminBaseContainer>
  );
}
