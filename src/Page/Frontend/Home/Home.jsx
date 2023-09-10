import Title from "../../../../PageTitle/Title";
import Course from "./Component/Course";
import Slider from "./Component/Slider";
import Instructor from "./Component/instructor";
import Review from "./Component/review";

const Home = () => {
    return (
        <div className="md:px-60">
            <Title title={'Home'}></Title>
            <Slider></Slider>
            <Course></Course>
            <Instructor></Instructor>
            <Review></Review>
        </div>
    );
};

export default Home;