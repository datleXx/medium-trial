import { api } from "~/trpc/server";

import Landing from "../components/landing/landing";

export default async function LandingPage() {



  return (
    <div>
      <Landing />
    </div>
  );
}


//  TODO: read next js file structure, routing file structure, recommended: https://www.youtube.com/watch?v=Vm7qM1wmXwE
