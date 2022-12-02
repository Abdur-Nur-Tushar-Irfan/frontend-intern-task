import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/login.webp'
import { AuthContext } from '../Context/UserContext';
import useToken from '../hooks/useToken';



const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const [createdUserEmail,setCreatedUserEmail]=useState('')
    const [token]=useToken(createdUserEmail)
    const [registerError, setRegisterError] = useState('')
    if(token){
        navigate('/attendence')
    }
    const handleRegister = (data) => {


        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                toast.success('successfully register')
                saveUsers(data.firstName,data.lastName,data.number,data.email,data.password)
            })
            .catch(error => {
                console.error(error)
                setRegisterError(error.message)
            })

    }
    
    const saveUsers=(firstName,lastName,number,email,password)=>{
        const users={firstName,lastName,number,email,password}
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(users)
        })
        .then(res=>res.json())
        .then(data=>{
            setCreatedUserEmail(email)
        })
        .catch(err=>console.log(err))
    }
   
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img alt='' className='lg:w-1/2' src={login} />
                <form onSubmit={handleSubmit(handleRegister)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center">Register!</h1>
                        <img className=' h-15 w-1/2 rounded-full mx-auto' alt='' />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" {...register("firstName", { required: 'FirstName is required' })} placeholder="Your First Name" className="input input-bordered" />
                            {errors.firstName?.type === 'required' && <p className='text-red-600 mt-2'>FirstName is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" {...register("lastName", { required: 'LastName is required' })} placeholder="Your Last Name" className="input input-bordered" />
                            {errors.lastName?.type === 'required' && <p className='text-red-600 mt-2'>LastName is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Number</span>
                            </label>
                            <input type="number" {...register("number", { required: 'Number is required' })} placeholder="Your Number" className="input input-bordered" />
                            {errors.number?.type === 'required' && <p className='text-red-600 mt-2'>Number is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input type="email" {...register("email", { required: 'Email is required' })} placeholder="Email" className="input input-bordered" />
                            {errors.email?.type === 'required' && <p className='text-red-600 mt-2'>Email is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password",
                                {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Password must be 8 character' }
                                })}
                                placeholder="password" className="input input-bordered" />
                            <label className="label">


                            </label>

                            {errors.password && <p className='text-red-600 mt-2'>{errors.password?.message}</p>}
                            <p className='text-red-600'>{registerError}</p>
                            <label className="label">
                                <p>Already Login? <Link to='/login' className='text-cyan-700 font-bold'>Log in</Link></p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn bg-sky-500 w-full' value='Register' type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;