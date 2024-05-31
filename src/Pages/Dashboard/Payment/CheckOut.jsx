import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";

const CheckOut = () => {
    
    const [error, setError] = useState()
    const stripe = useStripe()
    const {user} = useAuth()
    const elements = useElements()
    const axios = useAxios()
    const [clientSecret, setClientSecret]= useState('')
    const [cart] = useCart()
    const totalPrice = cart.reduce((total, item)=> total+ item.price, 0)
    console.log(totalPrice)
    useEffect(()=>{
        const gainData = async()=>{
            const {data} = await axios.post('/create-payment-intent', {price: totalPrice})
            setClientSecret(data.clientSecret)
            console.log(data.clientSecret);
        }
        gainData()
    },[axios, totalPrice])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log("Payment Error:", error)
            setError(error.message)
        }
        else {
            console.log('Payment Method:', paymentMethod);
            setError('')
        }

        //confirm payment
        const {paymentIntent} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4'
                            }
                        },
                        invalid: {
                            color: '#9e2146'
                        }
                    }
                }}>


            </CardElement>
            <button className="btn btn-sm mt-7 btn-accent" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
        </form>
    );
};

export default CheckOut;