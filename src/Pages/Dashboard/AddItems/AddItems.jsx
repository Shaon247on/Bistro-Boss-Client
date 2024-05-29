import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axios = useAxiosPublic()
    const axiosSecured = useAxios()
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgBB and then get an URL
        const imageFile = {image: data.image[0]}
        const res = await axios.post(image_hosting_api, imageFile,{
            headers: {
                'content-type': "multipart/form-data"
            }
        })
        if(res.data.success){
            // now send the item data with image to the server
            console.log(res.data.data.display_url);
            const menuItem= {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url 
            }
            const menuRes = await axiosSecured.post('/menu', menuItem)
            console.log(menuRes.data);  
            if(menuRes.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
            }           
        }
        console.log('with image URL:', res.data);
    }

    return (
        <div className="mb-28">
            <SectionTitle
                heading='add an item'
                subHeading="What's New"
            ></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="mx-7">
                <div className="form-control w-full my-3">
                    <div className="label">
                        <span className="label-text">Recipe Name*</span>
                    </div>
                    <input
                        {...register("name", { required: true, maxLength: 20 })}
                        type="text" placeholder="Type here" className="input input-bordered w-full" />                    
                </div>
                <div className="flex items-center gap-6">
                    {/* category */}
                    <div className="form-control w-full my-3">
                        <div className="label">
                            <span className="label-text">Category*</span>
                        </div>
                        <select
                            defaultValue='default'
                            {...register('category', { required: true})}
                            className="select select-bordered w-full">
                            <option disabled value='default'>Select a Category</option>
                            <option>Salad</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>

                        <div className="label">
                        </div>
                    </div>

                    {/* Price */}
                    <div className="form-control w-full my-3">
                        <div className="label">
                            <span className="label-text">Price*</span>
                        </div>
                        <input
                            {...register("price", { required: true})}
                            type="number" placeholder="Type here" className="input input-bordered w-full" />
                        
                    </div>
                </div>
                <div className="form-control">
                    <div className="label">
                        <span className="label-text">Recipe Details</span>
                    </div>
                    <textarea 
                    {...register('recipe', { required: true})}
                    className="textarea textarea-bordered h-24" placeholder="recipe details"></textarea>                    
                </div>
                <div className="mb-7">
                    <input
                    {...register('image', { required: true})}
                    type="file" className="file-input w-full max-w-xs" />
                </div>
                <button className="btn b">Add Item <FaUtensils></FaUtensils></button>
            </form>
        </div>
    );
};

export default AddItems;