import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer p-10 bg-base-200 text-base-content md:px-60">
                <div>
                    <Link to={'/'} className="font-extrabold text-4xl font-serif">Dance Zone</Link>
                    <p className="font-medium font-serif">International Dance Online Academy.</p>
                </div>
                <div>
                    <span className="footer-title">Menu</span>
                    <Link to={'/'} className="link link-hover">Home</Link>
                    <Link to={'/course'} className="link link-hover">Course</Link>
                    <Link to={'/instructor'} className="link link-hover">Instructor</Link>
                    <Link to={'/contact'} className="link link-hover">Contact us</Link>
                </div>
                <div>
                    <span className="footer-title">Follow Us</span>
                    <div className="flex gap-3 justify-center">
                        <a href="https://www.facebook.com/prevew.robi" target="_blank" rel="noreferrer"><img width="28" height="28" src="https://img.icons8.com/ios-glyphs/30/facebook-new.png" alt="facebook-new" /></a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><img width="28" height="28" src="https://img.icons8.com/ios-glyphs/30/linkedin-circled--v1.png" alt="linkedin-circled--v1" /></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img width="28" height="28" src="https://img.icons8.com/ios-glyphs/30/instagram-new.png" alt="instagram-new" /></a>
                    </div>
                </div>
                <div>
                    <span className="footer-title">Location</span>
                    <div className="flex gap-3">
                        <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/marker.png" alt="marker" />
                        <p>USA - New York City - Wall St. 10005</p>
                    </div>
                    <div className="flex gap-3">
                        <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/new-post.png" alt="new-post" />
                        <p>dancezone@gmail.com</p>
                    </div>
                    <div className="flex gap-3">
                        <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/phone--v1.png" alt="phone--v1" />
                        <p>+1209 299 7584</p>
                    </div>
                </div>
            </div>
            <div className="p-5 bg-base-300 text-base-content md:px-60">
                <p className="font-semibold">Copyright © 2023 - All right reserved by Dance Zone</p>
            </div>
        </footer>
    );
};

export default Footer;