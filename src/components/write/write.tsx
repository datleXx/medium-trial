"use client"; 

import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useState } from "react";
import Preview from "./preview";
import { Blog } from "~/Context/context";

const Write = () => {
    const [description, setDescription] = useState("")
    const {publishState, setPublishState} = Blog(); 
    return (
        <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <input 
                type="text" 
                placeholder="Title" 
                className="text-5xl outline-none w-full font-bold font-mono"
            />
            <ReactQuill 
                theme="bubble"
                value={description}
                onChange={setDescription}
                placeholder="Tell Your Story ..."
                className="write my-5"
            />
            <div className={publishState ? "" : "hidden"}>
                <Preview /> 
            </div>
        </section>
    )
}

export default Write; 