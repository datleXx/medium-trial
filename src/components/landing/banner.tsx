import Image from "next/image";
import Logo from "public/static/banner.png"; 
import { Blog } from "~/Context/context";

const Banner = () => {
    const {isSignIn, setIsSignIn, isSignUp, setIsSignUp} = Blog()

    return (
        <div className=' h-auto md:h-[80vh] flex items-center justify-center bg-[#FCC017] border-y border-black'>
            <div className='max-w-7xl flex-1 flex items-center justify-between'>
                <div className="space-y-5 py-4 px-10 flex-1">
                        <h1 className="max-w-xl text-[6rem] font-mediumSerif">Stay Curious. </h1>

                        <h3 className="text-2xl">Discover stories, thinking, and expertise from writers on any topic</h3>
                        <button onClick={() => {
                            setIsSignUp(true);
                            setIsSignIn(false); 
                            }} 
                            className='bg-black text-white py-2 px-4 rounded-full'>Start Reading</button>
                
                
                </div>
                <Image
                    alt="good image"
                    className="object-contain hidden h-32 md:inline-flex md:h-auto flex-1"
                    src={Logo.src}
                    width = {500}
                    height={400}
                />
            </div>
        </div>
    )
}

export default Banner;



// TODO: refactor file, group shared component such as navbar and footer into 1 single file for reusable code