import Lottie from "lottie-react";
import error from '../../assets/404_error.json';
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="h-screen">
            <Lottie className="w-full h-5/6" animationData={error} loop={true}></Lottie>
            <p className="text-center font-medium text-zinc-500">Page Not Found<Link to={'/'} className="btn btn-link text-gray-700 font-bold capitalize text-base">Go To Home</Link></p>
        </div>
    );
};

export default Error;