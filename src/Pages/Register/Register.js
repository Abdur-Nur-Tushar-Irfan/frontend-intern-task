import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import login from '../../assets/login.webp'

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [registerError, setRegisterError] = useState('')
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img alt='' className='lg:w-1/2' src={login} />
                <form onSubmit={handleSubmit} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <img className=' h-15 w-1/2 rounded-full mx-auto' alt='' />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" {...register("firstName", { required: true })} placeholder="Your First Name" className="input input-bordered" />
                            {errors.firstName?.type === 'required' && <p className='text-red-600 mt-2'>FirstName is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" {...register("lastName", { required: true })} placeholder="Your Last Name" className="input input-bordered" />
                            {errors.lastName?.type === 'required' && <p className='text-red-600 mt-2'>LastName is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Number</span>
                            </label>
                            <input type="number" {...register("number", { required: true })} placeholder="Your Number" className="input input-bordered" />
                            {errors.number?.type === 'required' && <p className='text-red-600 mt-2'>Number is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                            {errors.email?.type === 'required' && <p className='text-red-600 mt-2'>Email is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true, minLength: { value: 8, message: 'Password must be 8 character' } })} placeholder="password" className="input input-bordered" />
                            <label className="label">

                            </label>

                            {errors.password?.type === 'required' && <p className='text-red-600 mt-2'>Password is required</p>}
                            <p className='text-red-600'>{registerError}</p>
                            <label className="label">
                                <p>Already Login? <Link to='/login' className='text-cyan-700 font-bold'>Log in</Link></p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full' value='Register' type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;