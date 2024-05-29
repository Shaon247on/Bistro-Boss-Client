import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxios from '../../../Hooks/useAxios';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateItem = () => {
    const item = useLoaderData()
    const { register, handleSubmit } = useForm()
    const axiosSecured = useAxios()
    const axios = useAxiosPublic()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        })
        if (res.data.success) {
            // now send the item data with image to the server
            console.log(res.data.data.display_url);
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecured.patch(`/menu/${item._id}`, menuItem)
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/manageItems')
            }
        }


    }
    return (
        <div>
            <SectionTitle
                subHeading='Refresh Info'
                heading='Update an Item'
            ></SectionTitle>
            <p className='text-center text-lg font-semibold'>Item Name: <samp className='text-base font-light'>{item.name}</samp></p>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-7">
                <div className="form-control w-full my-3">
                    <div className="label">
                        <span className="label-text">Recipe Name*</span>
                    </div>
                    <input
                        {...register("name", { required: true, maxLength: 20 })}
                        type="text" defaultValue={item.name} placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="flex items-center gap-6">
                    {/* category */}
                    <div className="form-control w-full my-3">
                        <div className="label">
                            <span className="label-text">Category*</span>
                        </div>
                        <select
                            defaultValue='default'
                            {...register('category', { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value='default'>{item.category}</option>
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
                            {...register("price", { required: true })}
                            type="number" defaultValue={item.price} placeholder="Type here" className="input input-bordered w-full" />

                    </div>
                </div>
                <div className="form-control">
                    <div className="label">
                        <span className="label-text">Recipe Details</span>
                    </div>
                    <textarea
                        {...register('recipe', { required: true })}
                        className="textarea textarea-bordered h-24" defaultValue={item.recipe} placeholder="recipe details"></textarea>
                </div>
                <div className="mb-7">
                    <input
                        {...register('image', { required: true })}
                        type="file" className="file-input w-full max-w-xs" />
                </div>
                <button className="btn">Add Item <FaUtensils></FaUtensils></button>
            </form>
        </div>
    );
};

export default UpdateItem;