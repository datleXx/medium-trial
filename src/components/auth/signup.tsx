
import { Blog } from "~/Context/context";
import EmailSignUp from "./emailSignup";
const SignUp = () => {
  const {isSignIn, setIsSignIn, isSignUp, setIsSignUp, emailSignUp, setEmailSignUp} = Blog()
    return (
        <div className={"fixed inset-0 flex justify-center bg-white bg-opacity-70"}>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-[70%] h-full">
            {!emailSignUp ? (
              <>
                <div onClick={() => setIsSignUp(false)} className="cursor-pointer fixed right-[19%] hover:font-bold">X</div> 
                <div onClick={() => setIsSignUp(false)} className="cursor-pointer fixed right-[19%] hover:font-bold">X</div> 
                <div className="my-[5rem] flex gap-5">
                    <h2 className="text-3xl mb-4 font-mediumSerif py-7">Join Medium.</h2>
                </div>
                <div className="flex flex-col justify-center items-center w-full mb-8">
                    <button
                    className="border border-black text-black font-light font-mediumSerif py-2 px-4 rounded-full mb-2 w-[70%]"
                    //   onClick={() => signIn('google')}
                    >
                    Sign up with Google
                    </button>
                    <button
                    className="border border-black text-black font-light font-mediumSerif py-2 px-4 rounded-full mb-2 w-[70%]"
                    //   s
                    >
                    Sign up with Facebook
                    </button>
                    <button onClick={() => {
                      setEmailSignUp(true)
                    }} className="border border-black text-black font-light font-mediumSerif py-2 px-4 rounded-full mb-2 w-[70%]">
                    Sign up with email
                    </button>
                </div>
                <p className="mt-4">
                  Already have an account? <a onClick={() =>
                    {
                      setIsSignUp(false); 
                      setIsSignIn(true); 
                    }
                  } className="text-green-600 font-bold cursor-pointer">Sign in</a>
                </p>
                <p className="mt-8 text-sm w-[70%] text-[#787878]">
                Click “Sign up” to agree to Medium’s <span className="underline cursor-pointer">Terms of Service</span> and acknowledge that Medium’s<span className="underline cursor-pointer"> Privacy Policy</span> applies to you.
                </p>
              </>
            ) : <EmailSignUp />}
          </div>
        </div>
      );
}

export default SignUp; 