import { Dispatch, SetStateAction } from "react"

export type CustomizationProps = {
    publishState: boolean, 
    setPublishState: Dispatch<SetStateAction<boolean>>,
    isSignIn: boolean, 
    setIsSignIn: Dispatch<SetStateAction<boolean>>,
    isSignUp: boolean, 
    setIsSignUp: Dispatch<SetStateAction<boolean>>, 
    emailSignIn: boolean, 
    setEmailSignIn: Dispatch<SetStateAction<boolean>>, 
    emailSignUp: boolean, 
    setEmailSignUp: Dispatch<SetStateAction<boolean>>
};
