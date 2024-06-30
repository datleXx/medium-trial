"use client"; 

import Header from "./header"
import Banner from "./banner"
import Footer from "./footer"
import SignUp from "../auth/signup";
import SignIn from "../auth/login";
import { Blog } from "~/Context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Landing = () => {
    const {isSignIn, setIsSignIn, isSignUp, setIsSignUp} = Blog()
    const {data: session, status} = useSession()
    const router = useRouter();
    if (status === 'unauthenticated' || status === 'loading') {
        return (
            <>
                <Header />
                <Banner />
                <Footer />
                <div className={!isSignUp? "hidden" : ""}>
                    <SignUp />
                </div>
                <div className={!isSignIn? "hidden" : ""}>
                    <SignIn/>
                </div>
            </>
        )
    }
    else {
        router.push('/homepage');
        console.log(session?.user)
    }
}

export default Landing; 