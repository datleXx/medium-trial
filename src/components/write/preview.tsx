"use client" ;
import {  useRef, useState } from "react"
import { LiaTimesSolid } from "react-icons/lia"
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import {Blog} from "~/Context/context";

const Preview = () => {
    const imageref = useRef<HTMLInputElement | null>(null)
    const [url, setUrl] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const {publishState, setPublishState} = Blog(); 
    const handleClick = () => {
        if (imageref.current) {
            imageref.current.click()
        }
    }
    return (
        <section className="absolute inset-0 bg-white z-30">
            <div className="my-[2rem]">
                <span className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer">
                    <LiaTimesSolid onClick={() => setPublishState(false)}/> 
                </span>
                    <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
                        <div className="mx-[6rem] flex-1">
                            <h1 className="!text-2xl !font-mediumSerif !font-bold">Story Preview</h1>
                            <div
                             style={{backgroundImage: `url(${url})`}}
                             onClick={handleClick} className="w-full h-[200px] object-cover bg-gray-100 my-3 grid place-items-center text-center text-sm font-light text-[#787878] bg-cover">
                            {!url && 
                            <>
                                Include a high-quality image in your story to <br/> make it more inviting to readers.
                            </>}
                            </div>
                            <input onChange={(e) => {
                                if (e.target.files) {
                                    const file = e.target.files[0]; 
                                    if (file) {
                                        setUrl(URL.createObjectURL(file));    
                                    }
                                }
                            }} ref={imageref} type="file" hidden/>
                            <input 
                                type="text"
                                placeholder="Write a preview title"
                                className="outline-none w-full border-b border-gray-300 py-2 font-bold font-serif"/>
                            <input 
                                type="text"
                                placeholder="Write a preview subtitle ..."
                                className="mt-3 outline-none w-full border-b border-gray-300 py-2 text-xs font-thin"/>
                            
                            <p className="mt-5 text-xs text-[#787878]"><span className="font-bold">Note:</span> Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.</p>
                        
                                
                        </div>
                        <div className="flex-1 flex flex-col gap-4 mb-5 md:mb-0">
                            <h3 className="text-xl">Publishing to: <b className="capitalize">Xuan Dat</b></h3>
                            <p className="text-sm">Add or change topics (up to 5) so readers know what your story is about</p>
                            <InputTags className="border p-2 w-[90%] font-serif text-sm" placeholder="Add a topic ..." values={tags} onTags={(value) => setTags(value.values)}/> 
                            <p className="text-sm text-[#787870]"><span className="underline cursor-pointer">Learn more</span> about what happens to your post when you publish.</p>
                            <div className="flex items-center gap-4">
                                <button className=" bg-green-700 text-white text-sm w-fit p-2 rounded-full">Publish Now</button>
                                <p className="ml-3 text-sm text-[#787870] cursor-pointer"> Schedule for later </p>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    )
}

export default Preview; 