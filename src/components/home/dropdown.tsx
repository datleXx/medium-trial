import { LiaUserSolid } from "react-icons/lia"
import { MdOutlineLocalLibrary } from "react-icons/md"
import {BiSpreadsheet} from "react-icons/bi"
import {HiOutlineChartBar} from 'react-icons/hi'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Blog } from "~/Context/context"


const DropDownMenu = () => {
    const {publishState, setPublishState} = Blog(); 
    const {data:session} = useSession();
    let userId = ''; 
    if (session) {
        userId = session.user.id
    }

    const handleSignOut = async () => {
        if (session) {
            await signOut({callbackUrl:'/'})
        }
    }
    return (
        <div className="!mt-6 right-1 bg-white p-4">
            <div className="flex flex-col gap-5 items-center border-b">
                <Link onClick={() => setPublishState('default')} href={`/profile/${userId}`} className="flex items-center gap-8 cursor-pointer">
                    <span className="text-3xl">
                        <LiaUserSolid />
                    </span>
                    <span>
                        Profile
                    </span>
                </Link>
                <div className="flex items-center gap-8 cursor-pointer">
                    <span className="text-3xl">
                        <MdOutlineLocalLibrary />
                    </span>
                    <span>
                        Library
                    </span>
                </div>
                <div className="flex items-center gap-8 cursor-pointer">
                    <span className="text-3xl">
                        <BiSpreadsheet />
                    </span>
                    <span>
                    Stories
                    </span>
                </div>
                <div className="flex items-center gap-8 cursor-pointer mb-5">
                    <span className="text-3xl">
                        <HiOutlineChartBar />
                    </span>
                    <span>
                        Stats
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <span onClick={handleSignOut} className="cursor-pointer">
                    Sign Out
                </span>
            </div>
        </div>
    )
}

export default DropDownMenu; 