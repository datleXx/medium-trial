import HomeLayout from "~/layout/homelayout";
import Posts from "./posts";
import HomeHeader from "./header_home";

const HomePage = () => {
    return (
        <div>
            <HomeHeader/>
            <Posts/>
        </div>
    )
}

export default HomePage;