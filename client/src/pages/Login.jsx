import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { loggedInSuccessfully } from "../Utils/Toasts";
import { auth } from "../Utils/Firebase.config";
import { motion } from "framer-motion";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const Login = () => {
  const { user, loading, loginFunction } = UseAuth();
  const axiosPublicUrl = UseAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  //   functionality of login
  const handleLogin = (data) => {
    const userEmail = data?.email;
    const userPassword = data?.password;
    loginFunction(userEmail, userPassword)
      .then((response) => {
        loggedInSuccessfully();
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);

        reset();
      })
      .catch((error) => console.log(error));
  };

  // function for login  with google
  const googleLogin = () => {
    // console.log("google ");

    const provider = new GoogleAuthProvider(auth);

    signInWithPopup(auth, provider).then((response) => {
      const userEmail = response?.user?.email;
      console.log(userEmail);
      loggedInSuccessfully();
      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 1000);
    });
  };

  return (
    <div className="loginContainer   ">
      <div className="loginWrapper  h-screen bg-[url('https://i.ibb.co/6bsNLj8/hosting-login.jpg')] bgImage flex justify-center items-center  ">
        <div className="loginCard bg-white  shadow-2xl  py-9 px-4 w-[92%] xsm:w-[82%] sm:w-[72%] md:w-[64%] xmd:w-[55%] lg:w-[46%] rounded border border-gray-200    ">
          <h1 className="  headingFont text-xl sm:text-2xl font-bold xsm:font-semibold sm:font-medium mb-10 text-center  ">
            Login to your account{" "}
          </h1>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className=" w-[92%] xsm:w-[80%] sm:w-[76%] md:w-[72%] m-auto flex flex-col gap-8  "
          >
            {/* email input  */}
            <div className="emailInput">
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`block w-full m-auto  border bg-gray-50 border-gray-300     text-gray-900 text-sm rounded   p-2.5 outline-none`}
                placeholder="Enter your email"
              />

              {errors?.email && (
                <p className=" pt-1.5 text-red-600 font-semibold ">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            {/* email input  */}

            {/* password input  */}
            <div className="passwordInput">
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="block w-full m-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded   p-2.5 outline-none "
                placeholder="Enter your password"
              />
              {errors?.password && (
                <p className=" pt-1.5 text-red-600 font-semibold ">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            {/* password input  */}

            <button
              disabled={isSubmitting}
              className=" w-full  py-2 rounded  bg-sky-500 hover:bg-sky-600 navLinkFont text-gray-50 font-medium  text-lg flex justify-center items-center "
            >
              {isSubmitting ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* google login button  */}

          <div className="googleLogin  mt-6 flex justify-center  ">
            <button
              onClick={() => googleLogin()}
              className="flex items-center justify-center gap-2 rounded border border-gray-300 bg-gray-100 px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
            >
              <svg
                className="h-5 w-5 shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                  fill="#34A853"
                />
                <path
                  d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* google login button ends  */}

          <div className="registerDivert  mt-4 text-lg text-center  ">
            <p>
              Don't have an account ?{" "}
              <span className=" text-blue-500 logoFont ">
                {" "}
                <Link to={"/register"}>Register here</Link>{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
