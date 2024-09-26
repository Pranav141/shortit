import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authActions";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch=useDispatch()
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data))
  };
  const navigate=useNavigate()
  const {loading,userInfo,error,success}=useSelector((state)=>state.auth)
  useEffect(() => {
    if(userInfo?.name){
        navigate('/');
    }
    if(success){
        Swal.fire({title:"Success",text:"Logged In Successfully",icon:"success",timer:2000,
            willClose:()=>{
                navigate('/');
            }    
        })
    }
    if(error){
        Swal.fire({title:"Error",text:error,icon:"error",timer:2000})
    }
  }, [navigate,userInfo,success,error])
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Login
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
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
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
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className="py-2 bg-red-200 mt-1 px-2 text-red-600 rounded-md">{errors.password.message}</p>}
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
                "Login"
                }
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="#"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              to={'/register'}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
