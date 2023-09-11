import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CourseEnrollCheckoutForm from "./CourseEnrollCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_local_stripe_publishable_key);

const Checkout = () => {

    const { _id, class_name, class_image, course_price, available_seats, instructor_name, instructor_email } = useLoaderData();

    return (
        <div className="text-center mx-auto">
            <h2 className="text-1xl uppercase font-medium mb-10 text-gray-400">Checkout</h2>
            <Elements stripe={stripePromise}>
                <CourseEnrollCheckoutForm courseId={_id} courseName={class_name} courseImage={class_image} coursePrice={course_price} available_seats={available_seats} instructorName={instructor_name} instructorEmail={instructor_email}></CourseEnrollCheckoutForm>
            </Elements>
        </div>
    );
};

export default Checkout;