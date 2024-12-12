/* eslint-disable no-unused-vars */
import emailjs from '@emailjs/browser';
import { useContext, useEffect, useRef, useState } from 'react';
import Lottie from "lottie-react";
import Contact_us_email from '../../../assets/contact-us.json';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Auth/AuthProvider';
import Title from '../../../../PageTitle/Title';

export const ContactUs = () => {
    const form = useRef();
    const [progress, setProgress] = useState(false);
    const { user } = useContext(AuthContext);
    const [name, setSenderName] = useState('');
    const [email, setSenderEmail] = useState('');
    const [message, setSenderMessage] = useState('');

    useEffect(() => {
        setSenderName(user?.displayName)
        setSenderEmail(user?.email)
    }, [user])

    const handleName = event => {
        setSenderName(event.target.value);
    }

    const handleEmail = event => {
        setSenderEmail(event.target.value);
    }

    const handleMessage = event => {
        setSenderMessage(event.target.value);
    }

    const sendMessage = (event) => {
        event.preventDefault();

        if (name && email && message) {
            setProgress(true);
            fetch('https://dance-zone-server.vercel.app/contact-us/message', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    status: 'unseen'
                })
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

            setSenderMessage('');
            event.target.reset();

            emailjs.send('service_g00ymx6', 'template_vcau12c', { name, email, message }, 'F97OhNRR-CZ3SWv6S'
            )
                .then(res => {
                    console.log("Message Sent Successfully", res.status, res.text);
                })
                .catch(err => console.log("Error", err))
        }
    };

    return (
        <>
            <Title title={'Contact us'}></Title>
            <div className='lg:my-24'>
                <h1 className='text-center font-bold text-2xl mx-auto mb-10 divider w-96'>Contact Us</h1>
                <div className='flex justify-center lg:gap-20 flex-wrap py-8 mx-auto'>
                    <form ref={form} onSubmit={sendMessage}>
                        <div className='mb-5'>
                            <label className='block font-semibold'>Name</label>
                            <input type="text" name="user_name" placeholder='Your Name' defaultValue={name} onChange={handleName} required className="input input-bordered w-full max-w-xs mt-3" />
                        </div>
                        <div className='mb-5'>
                            <label className='block font-semibold'>Email</label>
                            <input type="email" name="user_email" placeholder='Your Email' defaultValue={email} onChange={handleEmail} required className="input input-bordered w-full max-w-xs mt-3" />
                        </div>
                        <div>
                            <label className='block font-semibold'>Message</label>
                            <textarea name="message" className="textarea textarea-bordered my-3" placeholder='Write Your Massage....' required cols={40} rows={3} value={message} onChange={handleMessage} />
                        </div>
                        <input type="submit" value="Send" disabled={progress} className='btn btn-neutral w-full mt-4' />
                    </form>
                    <Lottie animationData={Contact_us_email} loop={true} className='w-64'></Lottie>
                </div>
            </div>
        </>
    );
};

export default ContactUs;