import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BaseContainer } from "../view/container/BaseContainer";
import AdminBaseContainer from "../view/container/admin/BaseContainer";
import authSessionRepository from "../driver/repository/authSessionRepository";
import authRepository from "../driver/repository/authRepository";
import userRepository from "../driver/repository/userRepository";
import { authPermissionRoutes, publicRoutes, routes } from "../routes";
import { accountState } from "../schema/states/Account";

import NotFound from "./NotFound";
import Alert from "../Alert";
import Batch from "../Batch";
import { userState } from "../schema/states/User";

export default function Layout() {
  const [unauthorized, setUnauthorized] = useState<boolean | undefined>(
    undefined
  );
  const setAccount = useSetRecoilState(accountState);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLoginClose = () => {
    setUnauthorized(false);
    navigate(routes.login.path);
  };

  useEffect(() => {
    for (let v of Object.values(publicRoutes)) {
      if (v.re.test(pathname)) {
        setUnauthorized(false);
        return;
      }
    }
    for (let v of Object.values(authPermissionRoutes)) {
      if (v.re.test(pathname)) {
        authSessionRepository.find().then((session) => {
          const current = Math.floor(Date.now() / 1000);
          if (
            !!session &&
            session.exp > current &&
            session.status === "GRANT"
          ) {
            userRepository.findByUserId(session.userId).then((user) => {
              if (!user) {
                setUnauthorized(true);
                return;
              }
              setAccount({
                userId: user.id,
                activated: user.activated,
                verified: user.verified,
                isAdmin: user.isAdmin,
              });
              setUnauthorized(!user.activated);
            });
          } else {
            setUnauthorized(true);
          }
        });
        return;
      }
    }
  }, [pathname, setAccount]);

  if (typeof unauthorized === "undefined") return <></>;

  return !unauthorized ? (
    <BaseContainer
      repositories={{
        authSessionRepository,
        authRepository,
        userRepository,
      }}
    >
      <Outlet />
    </BaseContainer>
  ) : (
    <Alert
      open={!!unauthorized}
      onClose={handleLoginClose}
      message="로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다."
    />
  );
}

export const AdminLayout = () => {
  const [reject, setReject] = useState<boolean | undefined>(undefined);
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    authSessionRepository.find().then((session) => {
      const current = Math.floor(Date.now() / 1000);
      if (!!session && session.exp > current && session.status === "GRANT") {
        userRepository.findByUserId(session.userId).then((user) => {
          if (!user) {
            setReject(true);
          }
          setReject(!user?.isAdmin);
        });
      } else {
        setReject(true);
      }
    });
  }, []);

  useEffect(() => {
    authSessionRepository.find().then((session) => {
      if (!session?.userId) return { email: "" };

      userRepository.findByUserId(session?.userId).then((user) => {
        setUser(user);
        return { email: user?.email };
      });
    });
  });

  if (typeof reject === "undefined") return <></>;
  return reject ? (
    <NotFound />
  ) : (
    <AdminBaseContainer
      repositories={{
        authSessionRepository,
        authRepository,
        userRepository,
      }}
    >
      <Outlet />
      <Batch isActive={false} />
    </AdminBaseContainer>
  );
};
