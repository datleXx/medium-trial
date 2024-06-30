import { Blog } from "~/Context/context";
import EmailLogin from "./emailLogin";
import {signIn} from 'next-auth/react'

const SignIn = () => {
    const {isSignIn, setIsSignIn, isSignUp, setIsSignUp, emailSignIn, setEmailSignIn} = Blog()
    return (
        <div className={"fixed inset-0 flex justify-center bg-white bg-opacity-70"}>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-[70%] h-full">
            {!emailSignIn ? (
                <>
                <div onClick={() => setIsSignIn(false)} className="cursor-pointer fixed right-[19%] hover:font-bold">X</div> 
                <div className="my-[5rem] flex gap-5">
                  <h2 className="text-3xl mb-4 font-mediumSerif py-7">Welcome Back.</h2>
              </div>
              <div className="flex flex-col justify-center items-center w-full mb-8">
                  <button 
                  onClick={async () =>{
                    await signIn('google')
                  }}
                  className="border border-black text-black font-light font-mediumSerif py-2 px-4 rounded-full mb-2 w-[70%]"
                  >
                  Sign In with Google
                  </button>
                  <button 
                  className="border border-black text-black font-light font-mediumSerif py-2 px-4 rounded-full mb-2 w-[70%]"
                  >
                  Sign In with Facebook
                  </button>
                  <button onClick={() => {
                    setEmailSignIn(true)
                  }} className="border border-black text-black font-light font-mediumSerif py-2 px-4 rounded-full mb-2 w-[70%]">
                  Sign In with email
                  </button>
              </div>
              <p className="mt-4">
                No Account? <a onClick={() => {
                  setIsSignIn(false);
                  setIsSignUp(true);
                }} className="text-green-600 font-bold cursor-pointer">Create one</a>
              </p>
              <p className="mt-8 text-sm w-[70%] text-[#787878]"> 
                  Forgot email or trouble signing in? <span className="underline cursor-pointer">Get help</span>.
              </p>
              <p className="mt-8 text-sm w-[70%] text-[#787878]">
              Click “Sign up” to agree to Medium’s <span className="underline cursor-pointer">Terms of Service</span> and acknowledge that Medium’s<span className="underline cursor-pointer"> Privacy Policy</span> applies to you.
              </p>
              </>
            ) : <EmailLogin />}
          </div>
        </div>
      );
}

export default SignIn; 