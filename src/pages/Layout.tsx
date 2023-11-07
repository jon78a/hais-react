import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BaseContainer } from "../view/container/BaseContainer";
import AdminBaseContainer from "../view/container/admin/BaseContainer";
import authSessionRepository from "../driver/repository/authSessionRepository";
import authRepository from "../driver/repository/authRepository";
import userRepository from "../driver/repository/userRepository";
import studentRepository from "../driver/repository/studentRepository";
import gradeScoreRepository from "../driver/repository/gradeScoreRepository";
import { authPermissionRoutes, publicRoutes, routes } from "../routes";
import commonSubjectRepository from "../driver/repository/commonSubjectRepository";

import NotFound from "./NotFound";
import Alert from "../Alert";

export default function Layout() {
  const [unauthorized, setUnauthorized] = useState<boolean | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [needScore, setNeedScore] = useState<boolean | undefined>(undefined);

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const handleLoginClose = () => {
    setUnauthorized(false);
    navigate(routes.login.path);
  };

  const handleScoreClose = () => {
    setNeedScore(undefined);
    navigate(routes.myScore.path);
  }

  useEffect(() => {
    for (let v of Object.values(publicRoutes)) {
      if (v.re.test(pathname)) {
        setUnauthorized(false);
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
                    setUnauthorized(true);
                    return;
                  }
                  setUserId(user.id);
                  setUnauthorized(!user.activated);
                })
            } else { setUnauthorized(true) }
          });
        return;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!userId) return;
    if (pathname === routes.subjectRecommend.path) {
      studentRepository.findByUser(userId)
        .then((student) => {
          Promise.all([
            gradeScoreRepository.findByStudent(student.id),
            commonSubjectRepository.findBy({
              nameKeyword: ''
            })
          ])
            .then((value) => {
              const [scores, subjects] = value;
              setNeedScore(scores.length < subjects.length);
            });
        });
    }
  }, [userId, pathname]);

  if (typeof unauthorized === "undefined") return <></>;
  if (pathname === routes.subjectRecommend.path && needScore) return (
    <Alert open={!!needScore} onClose={handleScoreClose} message="공통과목 성적을 등록해주세요."/>
  );

  return !unauthorized ? (
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
    <Alert open={!!unauthorized} onClose={handleLoginClose} message="로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다."/>
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
