import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, recipe, image, price, _id } = item
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axios = useAxios()
    const [,refetch] = useCart()
    const handleAddToCart = async () => {
        
        if (user && user.email) {
            //send cart item to data base

            const cartItem = {
                menuId: _id,
                 email: user.email,
                 name,
                 image,
                 price
            }
            try{
                const {data} = await axios.post('/carts', cartItem)
                console.log(data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item added to your cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  // to update the items card
                  refetch()
            } 
            catch(err){
                console.log(err)
            }

        } else {
            Swal.fire({
                title: "You are not Logged in.",
                text: "Please login to add item to cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send user to the login page
                    navigate('/login', { state:location.pathname })
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /> </figure>
            <h3 className="bg-slate-950/80 text-white absolute right-5 top-5 px-4 rounded-lg">${price}</h3>
            <div className="card-body flex flex-col items-center gap-4">
                <h2 className="card-title justify-center">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleAddToCart} className="btn font-medium border-b-4 hover:border-b-4 border-b-[#BB8506] hover:border-b-[#BB8506] bg-[#E8E8E8] hover:bg-[#111827] duration-300 text-[#BB8506]">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;