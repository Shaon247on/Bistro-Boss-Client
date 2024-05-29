
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
const SignUp = () => {
    const { signUp, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        signUp(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const usersInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', usersInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the data base');
                                    reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Successfully Signed Up",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })

                    }).catch(error => {
                        console.error(error);
                    })
            }).catch(error => console.error(error))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Bistro Boss || Sign Up</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" {...register("name", { required: true })} type="text" placeholder="your name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input {...register("photoURL", { required: true })} type="text" placeholder="PhotoURL" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">PhotoURL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" {...register("password", {
                                required: true,
                                maxLength: 20,
                                minLength: 8,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{1,}).+$/
                            })} type="password" placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-600">Password should be more then 8 letter</p>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <p className="text-red-600">Password should be less then 20 letter</p>
                            )}
                            {errors.password?.type === "required" && (
                                <p className="text-red-600">password is required</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-600">password must have one uppercase, one lowercase, one number and one special character</p>
                            )}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value='Sign Up' />
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>

                    <div className='m-9'>
                        <p><small>Already have an account?<Link className='text-blue-500 hover:underline' to='/login'>Login</Link></small></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;