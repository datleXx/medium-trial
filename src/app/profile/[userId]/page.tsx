import Profile from "~/components/Profile/profile";
import HomeHeader from "~/components/home/header_home";

export default async function ProfilePage() {
  return (
    <div>
        <HomeHeader />
        <Profile /> 
    </div>
  );
}


//  TODO: read next js file structure, routing file structure, recommended: https://www.youtube.com/watch?v=Vm7qM1wmXwE
