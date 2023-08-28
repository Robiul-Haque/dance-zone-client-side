import emailjs from '@emailjs/browser';
import { useContext, useRef } from 'react';
import Lottie from "lottie-react";
import Contact_us_email from '../../../assets/contact-us.json';
import { AuthContext } from '../../../Auth/AuthProvider';

export const ContactUs = () => {
    const form = useRef();
    const {user} = useContext(AuthContext);

    const sendEmail = (event) => {
        event.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className='lg:my-24'>
            <h1 className='text-center font-bold font-serif text-2xl mx-auto mb-10 divider w-96'>Contact Us</h1>
            <div className='flex justify-center lg:gap-20 flex-wrap py-8 mx-auto'>
                <form ref={form} onSubmit={sendEmail}>
                    <div className='mb-5'>
                        <label className='block font-semibold'>Name</label>
                        <input type="text" name="user_name" defaultValue={user?.displayName} placeholder='Your Name' required className="input input-bordered w-full max-w-xs mt-3" />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-semibold'>Email</label>
                        <input type="email" name="user_email" defaultValue={user?.email} placeholder='Your Email' required className="input input-bordered w-full max-w-xs mt-3" />
                    </div>
                    <div>
                        <label className='block font-semibold'>Message</label>
                        <textarea name="message" className="textarea textarea-bordered my-3" placeholder='Write Your Massage....' required cols={40} rows={3} />
                    </div>
                    <input type="submit" value="Send" className='btn btn-neutral w-full mt-4' />
                </form>
                <Lottie animationData={Contact_us_email} loop={true} className='w-64'></Lottie>
            </div>
        </div>
    );
};

export default ContactUs;