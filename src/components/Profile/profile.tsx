'use client'; 

import { redirect } from "next/navigation";
import Link from "next/link";
import ProfileHome from "./Activities/profile-home";
import ProfileAbout from "./Activities/profile-about";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

const Profile = () => {

    const session = useSession(); 
    let userName;
    let userId; 
    let userImage; 
    if (!session || !session.data?.user) {

    }
    else {
        userName = session.data.user.name; 
        userId = session.data.user.id; 
        userImage = session.data.user.image; 
    }
    const activities = [
        {
            title: 'Home', 
            comp: ProfileHome, 
        }, 
        {
            title: 'About',
            comp: ProfileAbout, 
        }
    ]

    const [currentActive, setCurrentActive] = useState(activities[0]); 
    return (
    //     <section className="flex gap-[4rem] relative">

    //         <div className="mx-[9rem] mt-[9rem] flex-[2]">
    //             <div className="flex items-center gap-4">
    //                 <h2 className="text-3xl sm:text-5xl font-bold capitalize">{userName}</h2>
    //             </div>
    //             <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
    //                 {activities.map((item) => (
    //                     <div className={`py-[0.5rem] ${item.title === currentActive?.title ? "border-b border-gray-500" : ""}`}>
    //                         <button onClick={() => setCurrentActive(item)}>{item.title}</button>
    //                     </div>
    //                 ))}
    //             </div>
    //             <currentActive.comp />
    //         </div>

    //         <div className="flex-[1] border-l border-gray-300 p-[2rem] z-10">
    //             <Image 
    //                 src={session?.data?.user?.image ?? "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"}
    //                 alt="user image"
    //                 width={80}
    //                 height={80}
    //                 className="rounded-full"
                
    //             /> 
    //             <h2 className="mt-3 font-semibold">{userName}</h2>
    //             <button className="mt-5 text-sm text-green-600 hover:text-green-700">Edit this Profile</button>
    //         </div>

    //     </section>
    // 
    <div>Profile</div>
    )
}

export default Profile; 