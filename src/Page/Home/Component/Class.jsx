import dance_1 from '../../../assets/Dance-1.png';
import dance_2 from '../../../assets/Dance-2.png';
import dance_3 from '../../../assets/Dance-3.png';
import dance_4 from '../../../assets/Dance-4.png';
import dance_5 from '../../../assets/Dance-5.jpg';
import dance_6 from '../../../assets/Dance-6.jpg';

const Class = () => {
    return (
        <div className="my-20">
            <h1 className='text-4xl font-semibold text-center mb-10'>Popular Class</h1>
            <div className='flex justify-center gap-8 flex-wrap'>
                <img alt="image-1" src={dance_1} className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500' />
                <img alt="image-2" src={dance_2} className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500' />
                <img alt="image-3" src={dance_3} className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500' />
                <img alt="image-4" src={dance_4} className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500' />
                <img alt="image-5" src={dance_5} className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500 transition' />
                <img alt="image-6" src={dance_6} className='w-96 h-60 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500' />
            </div>
        </div>
    );
};

export default Class;