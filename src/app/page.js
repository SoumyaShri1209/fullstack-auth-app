"use client"

import { useRouter } from "next/navigation";




export default function Home() {


  const router = useRouter();

const loginPage = async() =>{
   router.push("/login")
}

const profilePage = async() =>{
   router.push("/profile")
}

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-6xl text-white mb-10 mt-5">This is home page</h1>
      <button className="bg-blue-500 p-4 text-black font-bold rounded hover:bg-blue-600"
      onClick={loginPage}
      
      >Login or Signup</button>
        

        <h1 className="text-2xl">Already logged in go to profile page</h1>

       <button className="bg-green-500 p-4 text-black font-bold rounded hover:bg-green-600"
      onClick={profilePage}
      
      >Profile Page</button>

    </div>
  );
}