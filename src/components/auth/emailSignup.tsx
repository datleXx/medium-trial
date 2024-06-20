import Input from "~/utils/input";
import { MdKeyboardArrowLeft } from "react-icons/md"
import { Blog } from "~/Context/context";

const EmailSignUp = () => {
    const {emailSignUp, setEmailSignUp} = Blog(); 
    return (
        <div className="mt-[6rem] text-center">
            <h2 className="text-3xl font-bold !font-serif">Sign in with Email</h2>
            <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
                Enter the email address associated with you account.
            </p>
            <form className="flex flex-col gap-4">
                <Input type="username" title="Username"/>
                <Input type="email" title="Email"/>
                <Input type="password" title="Password"/>
                <Input type="password" title="Re-enter password"/>
                <button className="px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto">Sign Up</button>
            </form>
            <button onClick={() => {
                setEmailSignUp(false)
            }} className="mt-5 text-sm text-green-600 hover:text-green-700
            flex items-center mx-auto">
                <MdKeyboardArrowLeft/>
                All sign Up options
            </button>

        </div>
    )
}

export default EmailSignUp; 