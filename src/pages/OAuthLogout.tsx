import { useEffect } from "react";

import authSessionRepository from "../driver/repository/authSessionRepository";
import { routes } from "../routes";

const OAuthLogout = () => {
  useEffect(() => {
    authSessionRepository.clear().then(() => window.location.replace(routes.home.path));
  },[]);
  return (
    <></>
  );
}

export default OAuthLogout;
