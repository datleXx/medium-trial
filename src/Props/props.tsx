import { Dispatch, SetStateAction } from "react"

export type CustomizationProps = {
    publishState: string, 
    setPublishState: Dispatch<SetStateAction<string>>,
    isSignIn: boolean, 
    setIsSignIn: Dispatch<SetStateAction<boolean>>,
    isSignUp: boolean, 
    setIsSignUp: Dispatch<SetStateAction<boolean>>, 
    emailSignIn: boolean, 
    setEmailSignIn: Dispatch<SetStateAction<boolean>>, 
    emailSignUp: boolean, 
    setEmailSignUp: Dispatch<SetStateAction<boolean>>
};
