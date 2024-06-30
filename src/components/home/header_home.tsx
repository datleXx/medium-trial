"use client"; 

import Logo from "public/static/logo.png";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blog } from "~/Context/context";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import DropDownMenu from "./dropdown";
import { useEffect, useState } from "react";
import {
    Popover, 
    PopoverTrigger, 
    PopoverContent, 
    Avatar,
} from '@nextui-org/react';
import { useSession } from "next-auth/react";

const HomeHeader = () => {
    
    const pathName = usePathname();
    const {publishState, setPublishState} = Blog(); 
    const session = useSession(); 
    let userImage: React.ReactNode

    if (session.data?.user){
        userImage = <Avatar src={session.data.user.image ?? ""} />
    }
    else {
        userImage = <div>User Image</div>
    }
    return (
        <div className="flex justify-between gap-10 border-[0.5px] border-black p-5">
            <div className="flex-start flex items-center">
                <Link href="/homepage">
                <Image alt="medium-logo" src={Logo} width={200} height={40} />
                </Link>
            </div>
            <div className="flex cursor-pointer items-center gap-3 space-x-5 text-sm text-gray-500 font-light sm:gap-7">
            {pathName === "/posts/write" ? <button onClick={() => setPublishState(true)} className=" !bg-green-700 !px-2 !py-1 !text-white !rounded-full">Publish</button> :                 
                <Link href="/posts/write" className="hidden md:flex items-center gap-1">
                    <span className="text-3xl">
                        <LiaEditSolid /> 
                    </span>
                    <span className="text-sm mt-2">Write</span>
                </Link>}
                <div className="hover:font-semibold">
                    <IoMdNotificationsOutline className="text-3xl cursor-pointer"/>
                </div>
                <Popover placement="bottom">
                    <PopoverTrigger className="flex items-center relative">
                        {userImage}
                    </PopoverTrigger>
                    <PopoverContent>
                        <div>
                            <DropDownMenu />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default HomeHeader;
