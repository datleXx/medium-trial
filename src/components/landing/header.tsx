import Image from "next/image"
import Logo from "public/static/logo.png"
import Link from "next/link"
import { Blog } from "~/Context/context"

const Header = () => {
    const {isSignIn, setIsSignIn, isSignUp, setIsSignUp} = Blog()

    return (
        <div className='flex justify-center gap-10 p-5 bg-[#FCC017]'>
          <div className='max-w-7xl flex-1 flex justify-between gap-10'>
            <div className='flex items-center flex-start'>
              <Link href='/'>
                <Image
                    className='cursor-pointer object-contain'
                    src={Logo}
                    height={40}
                    width={200}
                    alt='logo'
                />
              </Link>   
            </div>
            <div className='sm: text-sm flex cursor-pointer items-center justify-end gap-3 space-x-5'>
                <div className="hidden sm:block">Our Story</div>
                <div className="hidden sm:block">Membership</div>
                <div className="hidden sm:block">Write</div>
                <div onClick={() => {
                  setIsSignUp(false); 
                  setIsSignIn(true); 
                }} className="hidden sm:block">Sign In</div>
                <div onClick={() => {
                  setIsSignUp(true); 
                  setIsSignIn(false); 
                }} className='bg-black text-white py-2 px-4 rounded-full'>Get Started</div>
            </div>
          </div>
      </div>
    )
}

export default Header

// TODO: refactor file name, convention: "PostCard", we use the .tsx here to enable typescript, remove .js
// TODO: put className using inline styling, "const styles" might seem tidy but bad practice