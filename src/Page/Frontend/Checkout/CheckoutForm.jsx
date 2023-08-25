/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider";
import { toast } from "react-toastify";
import './Checkout';

const CheckoutForm = ({ classId, className, classImage, coursePrice, instructorName, instructorEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [progress, setProgress] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/student/selected-course/create-payment-intent', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ price: coursePrice })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data?.clientSecret);
            })
    }, [])

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setError(error.message);
        } else {
            console.log('PaymentMethod', paymentMethod);
        }

        setProgress(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        setProgress(false);

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            fetch('http://localhost:5000/student/selected-course/payment-info', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    transaction_id: paymentIntent.id,
                    user_name: user?.displayName,
                    user_email: user?.email,
                    class_name: className,
                    class_image: classImage,
                    course_price: coursePrice,
                    instructor_name: instructorName,
                    instructor_email: instructorEmail,
                    date: new Date().toISOString().slice(0,10)
                })
            })
                .then(res => res.json())
                .then(data => {

                    if (data.insertedId) {
                        toast.success('Payment Successful', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        fetch(`http://localhost:5000/student/selected-course/${classId}`, {
                            method: "DELETE"
                        })
                            .then(res => res.json())
                            .then(data => console.log(data))
                    }
                })
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="w-96">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || progress} className="btn btn-neutral btn-sm mt-5">Pay</button>
            </form>
            {
                error && <p className="text-red-500 mt-10 font-medium justify-center flex items-center gap-3"><img width="28" height="28" src="https://img.icons8.com/ios-glyphs/30/ef4444/error--v1.png" alt="error--v1" /> {error}</p>
            }
            {
                transactionId && <p className="text-green-500 mt-10 font-medium justify-center flex items-center gap-3"><img width="28" height="28" src="https://img.icons8.com/ios-glyphs/30/22c55e/ok--v1.png" alt="ok--v1" /> Payment Successful And Transaction ID: {transactionId}</p>
            }
        </>
    );
};

export default CheckoutForm;