import Image from "next/image";
import Logo from "../../public/static/logo.png"
import { FiBookmark } from "react-icons/fi";

const PostCard = () => {
    
    return (
        <div className='w-[60%] border-b-[0.5px] flex max-width-[46rem] h-[10rem] items-center gap-[1rem] cursor-pointer px-5'>
            <div className='flex flex-col'>
                <div className='flex gap-[.4rem]'>
                    <div className='grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]'>
                        <Image
                            alt="postcard"
                            src = {Logo}
                            className='object-cover'
                            width={40}
                            height={40}
                        />

                    </div>
                    <div className='font-semibold'>Xuan Dat Le</div>
                </div>
                <h1 className='font-bold text-2xl'>Blahasdfasdfkj; sdfk;asjdf laksdfj sdf </h1>
                <div className='text-[#787878]'>Lalasldflsadf sdfasdflasdflasfdj</div>

                <div className='flex items-center justify-between text-[#787878]'>
                    <span className='my-2 text-[.8rem]'>Jun 15 • 5 min read • <span className='bg-[#F2F3F2] p-1 rounded-full'>Productivity</span></span>
                    <span className='cursor-pointer'>
                        <FiBookmark className='h-5 w-5'/>
                    </span>
                </div>
            </div>
            <div className=''>
                    <Image
                        alt="good image"
                        src={Logo}
                        height={100}
                        width={100}
                    />
            </div>
        </div>
    )
}

export default PostCard; 


// TODO: put className using inline styling, "const styles" might seem tidy but bad practice