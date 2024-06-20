import { ScriptProps } from "next/script";
import HomeHeader from "~/components/home/header_home"

const HomeLayout = ({children}: ScriptProps) => {
    return (
        <div>
            <HomeHeader />
            <div>
                {children}
            </div>
        </div>
    )
}

export default HomeLayout; 