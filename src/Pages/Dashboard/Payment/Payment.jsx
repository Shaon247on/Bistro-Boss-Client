import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";


//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_GETWAY_PK)

const Payment = () => {
    return (
        <div>
            <SectionTitle
                heading='Payment'
                subHeading='Select Your Method'
            ></SectionTitle>
            <div className="mx-10">
                <Elements stripe={stripePromise}>
                    <CheckOut></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;