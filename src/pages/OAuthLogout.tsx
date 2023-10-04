import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { routes } from "../routes";

import authSessionRepository from "../driver/repository/authSessionRepository";

const OAuthLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authSessionRepository.clear().then(() => navigate(routes.home.path, {replace: true}));
  });
  return (
    <></>
  );
}

export default OAuthLogout;
