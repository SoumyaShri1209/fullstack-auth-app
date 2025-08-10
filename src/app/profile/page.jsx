"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage(){
   const router = useRouter();
   const [data, setData] = useState("nothing")

   const getUserDetails = async() =>{
    const response = await axios.get("/api/users/me")
    console.log(response.data);
    setData(response.data.data._id)
   }

   const logout = () =>{
    try {
        axios.get("/api/users/logout")
        toast.success("logout successful")
        router.push("/login")
        
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }

   }

   return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
     <hr />
        <p className="text-4xl ">Profile Page</p>
        <h2 className=" p-3 rounded text-red-500 text-lg"
        >{data ==="nothing" ? "" : <Link className="text-blue-500 hover:underline" href={`/profile/${data}`}
        >Go to user profile</Link>}</h2>
       
       <hr />
      
        <button
      onClick={getUserDetails}
      className=" bg-green-600  cursor-pointer mt-4 hover:bg-green-700 hover:border-black   rounded-lg  focus:outline-none focus:border-gray-600 mb-40  p-2">Get User Details</button>

         <button
      onClick={logout}
      className="cursor-pointer mt-4 bg-red-600 hover:bg-red-700 text-black   rounded-lg mb-4    p-2">Logout</button>

      
            <Link className="text-blue-500 hover:underline" href="/">Go to home page</Link>

    </div>

   )

}