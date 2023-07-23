import instructor_1 from '../../../assets/Instructor-1.png';
import instructor_2 from '../../../assets/Instructor-2.png';
import instructor_3 from '../../../assets/Instructor-3.jpg';
import instructor_4 from '../../../assets/Instructor-4.jpg';
import instructor_5 from '../../../assets/Instructor-5.jpg';
import instructor_6 from '../../../assets/Instructor-6.png';


const Instructor = () => {
    return (
        <div className='my-20'>
            <h1 className="text-4xl font-semibold text-center mb-10">Popular Instructor</h1>
            <div className='flex justify-center gap-8 flex-wrap'>
                <img src={instructor_1} alt="instructor_1" className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 hover:shadow-lg hover:shadow-neutral-500 transition duration-300 ease-out hover:ease-in' />
                <img src={instructor_2} alt="instructor_2" className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 hover:shadow-lg hover:shadow-neutral-500 transition duration-300 ease-out hover:ease-in' />
                <img src={instructor_3} alt="instructor_3" className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 hover:shadow-lg hover:shadow-neutral-500 transition duration-300 ease-out hover:ease-in' />
                <img src={instructor_4} alt="instructor_4" className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 hover:shadow-lg hover:shadow-neutral-500 transition duration-300 ease-out hover:ease-in' />
                <img src={instructor_5} alt="instructor_5" className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 hover:shadow-lg hover:shadow-neutral-500 transition duration-300 ease-out hover:ease-in' />
                <img src={instructor_6} alt="instructor_6" className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 hover:shadow-lg hover:shadow-neutral-500 transition duration-300 ease-out hover:ease-in' />
            </div>
        </div>
    );
};

export default Instructor;