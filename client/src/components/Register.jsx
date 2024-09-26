import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authActions";
import Swal from 'sweetalert2'
import ClipLoader from "react-spinners/ClipLoader";
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {loading,userInfo,error,success}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };
  useEffect(()=>{
    if(userInfo?.name){
      return navigate('/');
    }
    if(success){
        Swal.fire({title:"Success",text:"User Registered successfully",icon:"success",timer:2000,
            willClose:()=>{
                navigate('/');
            }    
        })
    }
    if(error){
        Swal.fire({title:"Error",text:error,icon:"error",timer:2000})
    }
  },[navigate,success,error,userInfo])
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mb-28">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>
        {error && <p className="py-2 bg-red-200 mt-2 px-2  text-red-600 rounded-md">{error}</p>}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    }
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && <p className="py-2 bg-red-200 mt-1 px-2 text-red-600 rounded-md">{errors.name.message}</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  
                  autoComplete="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Is Required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email Address",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className="py-2 bg-red-200 mt-1 px-2 text-red-600 rounded-md">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  {...register("password", {
                    required: {value:true,message:"Password is required"},
                    minLength: {
                      value: 8,
                      message: "Should be atleast 8 characters long.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Should be less than 20 characters long.",
                    },
                    pattern:{
                        value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                        message:"Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
                    }
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className="py-2 bg-red-200 mt-1 px-2 text-red-600 rounded-md">{errors.password.message}</p>}
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input                  
                  type="password"
                  {...register("confirmPassword", {
                    required: {value:true,message:"Password is required"},
                    validate:(val)=>{
                        if(watch("password")!==val){
                            return "Password Not Matching";
                        }
                    }
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && <p className="py-2 bg-red-200 mt-1 px-2 text-red-600 rounded-md">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {loading ? <ClipLoader
                    color={"#ffffff"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />:
                "Register"
                }
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
            to={'/login'}
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
