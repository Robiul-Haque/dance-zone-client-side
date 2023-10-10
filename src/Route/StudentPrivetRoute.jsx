/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";

const StudentPrivetRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="text-center mt-32">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (user?.email) {
        return children;
    } else {
        <Navigate to='/login'></Navigate>
    }
};

export default StudentPrivetRoute;