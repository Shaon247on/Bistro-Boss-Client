
import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
const Login = () => {
    const [disable, setDisable] = useState(true)
    const { logIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.state)
    

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        logIn(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(location.state ? location.state : '/')

            })
            .catch(error => {
                console.error(error);
            })
    }
    const handleValidateCaptcha = (e) => {
        const value = e.target.value
        console.log(value);
        if (validateCaptcha(value)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])
    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Bistro Boss || Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                < LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha} name="captcha" type="text" placeholder="type the text above" className="input input-bordered"  />
                        </div>
                        <div className="form-control mt-6">
                            {/* apply disable for re captcha */}
                            <input disabled={false} type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </form>
                    <div className='m-9'>
                        <p><small>New Here?<Link className='text-blue-500 hover:underline' to='/signup'>Create an Account</Link></small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;