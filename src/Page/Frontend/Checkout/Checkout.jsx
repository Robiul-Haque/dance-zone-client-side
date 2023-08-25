import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_local_stripe_publishable_key);

const Checkout = () => {

    const { _id, class_name, class_image, course_price, instructor_name, instructor_email } = useLoaderData();

    return (
        <div className="text-center">
            <h2 className="text-1xl uppercase font-medium mb-10 text-gray-400">Checkout</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm classId={_id} className={class_name} classImage={class_image} coursePrice={course_price} instructorName={instructor_name} instructorEmail={instructor_email}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Checkout;