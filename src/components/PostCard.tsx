import Image from "next/image";
import Logo from "../../public/static/logo.png"
import { FiBookmark } from "react-icons/fi";
import {
    Avatar,
} from '@nextui-org/react';

interface PostCardProps {
    authorName: string, 
    previewTitle: string, 
    previewSubtitle: string, 
    tags: string[], 
}

const PostCard = ({authorName, previewTitle, previewSubtitle, tags}: PostCardProps) => {
    const renderedTags = tags.map((tag) => {
        return (
            <span key={tag} className='bg-[#F2F3F2] p-1 rounded-full'>
                {tag}
            </span>
        )
    })
    return (
        <div className='border-b flex max-w-[46rem] h-[10rem] items-center gap-[1rem] cursor-pointer my-5 !pr-11'>
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
                    <div className='font-semibold'>{authorName}</div>
                </div>
                <h1 className='font-bold text-2xl'>{previewTitle} </h1>
                <div className='text-[#787878]'>{previewSubtitle}</div>

                <div className='flex items-center justify-between text-[#787878]'>
                    <div className='my-2 text-[.8rem]'>
                        Jun 15 • 5 min read • 
                        <div className="flex gap-3">
                            {renderedTags}
                        </div>
                    </div>
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