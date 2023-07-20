/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (user?.email) {
        return children;
    } else {
        <Navigate to='/login'></Navigate>
    }

    if (loading) {
        return (
            <div className="text-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

};

export default PrivetRoute;