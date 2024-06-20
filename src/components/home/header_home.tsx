"use client"; 

import Logo from "public/static/logo.png";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blog } from "~/Context/context";

const HomeHeader = () => {
    
    const pathName = usePathname();
    console.log(pathName);
    const {publishState, setPublishState} = Blog(); 

    return (
        <div className="flex justify-between gap-10 border-[0.5px] border-black p-5">
            <div className="flex-start flex items-center">
                <Link href="/homepage">
                <Image alt="medium-logo" src={Logo} width={200} height={40} />
                </Link>
            </div>
            <div className="flex cursor-pointer items-center gap-3 space-x-5 text-sm font-light">
            {pathName === "/write" ? <button onClick={() => setPublishState(true)} className=" !bg-green-700 !px-2 !py-1 !text-white !rounded-full">Publish</button> :                 
                <Link href="/write">
                    <div className="hover:font-semibold">Write</div>
                </Link>}
                <div className="hover:font-semibold">Notification</div>
                <CgProfile className="cursor-pointer" />
            </div>
        </div>
    );
};

export default HomeHeader;
