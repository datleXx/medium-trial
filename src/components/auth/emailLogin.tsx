import Input from "~/utils/input";
import { MdKeyboardArrowLeft } from "react-icons/md"
import { Blog } from "~/Context/context";

const EmailLogin = () => {
    const {emailSignIn, setEmailSignIn} = Blog(); 
    return (
        <div className="mt-[6rem] text-center">
            <h2 className="text-3xl font-bold !font-serif">Sign in with Email</h2>
            <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
                Enter the email address associated with you account.
            </p>
            <form className="flex flex-col gap-4">
                <Input type="email" title="email"/>
                <Input type="email" title="password"/>
                <button className="px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto">Sign In</button>
            </form>
            <button onClick={() => {
                setEmailSignIn(false)
            }} className="mt-5 text-sm text-green-600 hover:text-green-700
            flex items-center mx-auto">
                <MdKeyboardArrowLeft/>
                All sign In options
            </button>

        </div>
    )
}

export default EmailLogin; 