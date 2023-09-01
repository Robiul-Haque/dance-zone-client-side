import emailjs from '@emailjs/browser';
import { useContext, useRef, useState } from 'react';
import Lottie from "lottie-react";
import Contact_us_email from '../../../assets/contact-us.json';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Auth/AuthProvider';

export const ContactUs = () => {
    const form = useRef();
    const [progress, setProgress] = useState(false);
    const { user } = useContext(AuthContext);

    const sendMessage = (event) => {
        event.preventDefault();
        const form = event.target;
        const userName = form.user_name.value;
        const userEmail = form.user_email.value;
        const userMessage = form.message.value;
        const message = {
            name: userName,
            email: userEmail,
            message: userMessage,
            status: 'unseen'
        }

        setProgress(true);
        if (message) {
            fetch('http://localhost:5000/contact-us/message', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(message)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.insertedId) {
                        toast.success('Message Send Successfully', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                    setProgress(false);
                })
        }

        form.reset();

        emailjs.sendForm('service_imz27cr', 'template_vcau12c', form.current, 'F97OhNRR-CZ3SWv6S')
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
                <form ref={form} onSubmit={sendMessage}>
                    <div className='mb-5'>
                        <label className='block font-semibold'>Name</label>
                        <input type="text" name="user_name" placeholder='Your Name' defaultValue={user?.displayName} required className="input input-bordered w-full max-w-xs mt-3" />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-semibold'>Email</label>
                        <input type="email" name="user_email" placeholder='Your Email' defaultValue={user?.email} required className="input input-bordered w-full max-w-xs mt-3" />
                    </div>
                    <div>
                        <label className='block font-semibold'>Message</label>
                        <textarea name="message" className="textarea textarea-bordered my-3" placeholder='Write Your Massage....' required cols={40} rows={3} />
                    </div>
                    <input type="submit" value="Send" disabled={progress} className='btn btn-neutral w-full mt-4' />
                </form>
                <Lottie animationData={Contact_us_email} loop={true} className='w-64'></Lottie>
            </div>
        </div>
    );
};

export default ContactUs;