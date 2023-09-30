import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import { Offline, Online } from "react-detect-offline";
import Lottie from "lottie-react";
import offline from '../assets/Lost-connation.json';

const Main = () => {

  const location = useLocation();
  const routes = ['/student/dashboard', '/instructor-dashboard', '/admin-dashboard'];

  return (
    <>
      <Navbar></Navbar>

      <Online>
        <Outlet></Outlet>
      </Online>

      <Offline>
        <div className="h-screen">
          <Lottie className="w-full h-5/6" animationData={offline} loop={true}></Lottie>
          <h2 className="text-center text-stone-600 font-bold text-3xl">You Are Offline...</h2>
        </div>
      </Offline>

      {
        !routes.includes(location.pathname) && <Footer></Footer>
      }
    </>
  );
};

export default Main;