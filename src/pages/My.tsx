import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

const MyPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(routes.myScore.path);
    }, []);
    return (<></>);
}

export default MyPage;
