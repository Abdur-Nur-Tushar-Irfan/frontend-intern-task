import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login1 from'../../assets/login1.webp'
import { AuthContext } from '../Context/UserContext';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setloginError] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const { signIn } = useContext(AuthContext)


    const handleLogin = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                setloginError('')
                
            })
            .catch(error => {
                console.error(error)
                setloginError(error.message)
            })
    }
    
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img alt='' className='lg:w-1/2' src={login1} />

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-3">
                    <h1 className="text-3xl font-bold text-center">Login now!</h1>
                    <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text"  {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full max-w-xs" />
                            {errors.email?.type === 'required' && <p className='text-red-700 mt-2'>Email is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: 'password is required', minLength: { value: 8, message: 'Password must be 8 character' } })} placeholder="password" className="input input-bordered" />
                            <label className="label">
                            {errors.password  && <p className='text-red-600 mt-2'>{errors.password?.message}</p>}

                            </label>
                            <p className='text-red-600'>{loginError}</p>
                            <p>Already registered? <Link className='text-cyan-700 font-bold' to='/register'>Register</Link></p>


                        </div>
                        <input className='btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full' value='Login' type="submit" />
                        
                       
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Login;