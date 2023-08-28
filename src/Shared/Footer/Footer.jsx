import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer p-10 bg-base-200 text-base-content md:px-60">
                <div>
                    <Link to={'/'} className="font-extrabold text-4xl">Dance Zone</Link>
                    <p className="font-medium">International Dance Online Academy.</p>
                </div>
                <div>
                    <span className="footer-title">Menu</span>
                    <Link className="link link-hover">Home</Link>
                    <Link className="link link-hover">Course</Link>
                    <Link className="link link-hover">Instructor</Link>
                </div>
                <div>
                    <span className="footer-title">Social Media</span>
                    <div className="flex gap-3 justify-center">
                        <a href="https://www.facebook.com/prevew.robi" target="_blank" rel="noreferrer"><img width="32" height="32" src="https://img.icons8.com/ios-glyphs/30/facebook-new.png" alt="facebook-new" /></a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><img width="32" height="32" src="https://img.icons8.com/ios-glyphs/30/linkedin-circled--v1.png" alt="linkedin-circled--v1" /></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img width="32" height="32" src="https://img.icons8.com/ios-glyphs/30/instagram-new.png" alt="instagram-new" /></a>
                    </div>
                </div>
                <div>
                    <span className="footer-title">Location</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
                <div>
                    <span className="footer-title">Location</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </div>
            <div className="p-5 bg-base-300 text-base-content md:px-60">
                <p className="font-semibold">Copyright © 2023 - All right reserved by Dance Zone</p>
            </div>
        </footer>
    );
};

export default Footer;