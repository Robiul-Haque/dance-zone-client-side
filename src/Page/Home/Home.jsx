import Class from "./Component/Class";
import Slider from "./Component/Slider";
import Instructor from "./Component/instructor";
import Review from "./Component/review";

const Home = () => {
    return (
        <div className="md:px-60">
            <Slider></Slider>
            <Class></Class>
            <Instructor></Instructor>
            <Review></Review>
        </div>
    );
};

export default Home;