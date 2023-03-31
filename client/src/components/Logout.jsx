import { useEffect } from "react";
import { useDispatch, } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "state";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(reset());
        navigate("/", { replace: true })
    }, []);
};

export default Logout;