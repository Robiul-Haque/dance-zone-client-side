import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {

  const location = useLocation();
  const routes = ['/student/dashboard', '/instructor-dashboard', '/admin-dashboard'];

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {
        !routes.includes(location.pathname) && <Footer></Footer>
      }
    </>
  );
};

export default Main;