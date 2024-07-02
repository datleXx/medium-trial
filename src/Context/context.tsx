"use client"; 

import { ScriptProps } from "next/script";
import { createContext, useContext, useState } from "react"
import { CustomizationProps} from "~/Props/props";


const DefaultState: CustomizationProps = {
    publishState: 'default', 
    setPublishState: () => 'default', 
    isSignIn: false, 
    setIsSignIn: () => false, 
    isSignUp: false, 
    setIsSignUp: () => false,
    emailSignIn: false, 
    setEmailSignIn: () => false, 
    emailSignUp: false, 
    setEmailSignUp: () => false} 


const BlogContext = createContext(DefaultState); 


const Context = ({children}: ScriptProps) => {
    const [publishState, setPublishState] = useState('default')
    const [isSignIn, setIsSignIn] = useState(false) 
    const [isSignUp, setIsSignUp] = useState(false)
    const [emailSignIn, setEmailSignIn] = useState(false)
    const [emailSignUp, setEmailSignUp] = useState(false)

    return (
        <BlogContext.Provider
            value={{
                publishState, 
                setPublishState, 
                isSignIn, 
                setIsSignIn, 
                isSignUp, 
                setIsSignUp,
                emailSignIn, 
                setEmailSignIn, 
                emailSignUp,
                setEmailSignUp
            }}>
                {children}
        </BlogContext.Provider>
    )
}

export default Context; 

export const Blog = () => useContext(BlogContext); 