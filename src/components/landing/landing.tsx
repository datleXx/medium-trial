"use client"; 

import Header from "./header"
import Banner from "./banner"
import Footer from "./footer"
import SignUp from "../auth/signup";
import SignIn from "../auth/login";
import { Blog } from "~/Context/context";

const Landing = () => {
    const {isSignIn, setIsSignIn, isSignUp, setIsSignUp} = Blog()

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

export default Landing; 