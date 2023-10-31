import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BaseContainer } from "../view/container/BaseContainer";
import AdminBaseContainer from "../view/container/admin/BaseContainer";
import authSessionRepository from "../driver/repository/authSessionRepository";
import authRepository from "../driver/repository/authRepository";
import userRepository from "../driver/repository/userRepository";
import { authPermissionRoutes, publicRoutes, routes } from "../routes";

import NotFound from "./NotFound";
import Alert from "../Alert";

export default function Layout() {
  const [reject, setReject] = useState<boolean | undefined>(undefined);

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    setReject(false);
    navigate(routes.login.path);
  };

  useEffect(() => {
    for (let v of Object.values(publicRoutes)) {
      if (v.re.test(pathname)) {
        setReject(false);
        return;
      }
    }
    for (let v of Object.values(authPermissionRoutes)) {
      if (v.re.test(pathname)) {
        authSessionRepository.find()
          .then((session) => {
            const current = Math.floor(Date.now() / 1000);
            if (!!session && session.exp > current && session.status === "GRANT") {
              userRepository.findByUserId(session.userId)
                .then((user) => {
                  if (!user) { 
                    setReject(true);
                  }
                  setReject(!user?.activated);
                })
            } else { setReject(true) }
          });
        return;
      }
    }
  }, [pathname]);

  if (typeof reject === "undefined") return <></>;

  return !reject ? (
    <BaseContainer
      repositories={{
        authSessionRepository,
        authRepository,
        userRepository
      }}
    >
      <Outlet />
    </BaseContainer>
  ) : (
    <Alert open={!!reject} onClose={handleClose} message="로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다."/>
  )
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
