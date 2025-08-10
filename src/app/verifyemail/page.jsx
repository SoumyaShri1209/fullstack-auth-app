"use client"

import axios from "axios"
import Link from "next/link"
import React , { useEffect , useState } from "react"



export default function VerifyEmailPage(){

    const [token , setToken] = useState("");
    const [verified , setVerified] = useState(false);
    const [error , setError] = useState(false);


    const verifyUserEmail = async() =>{
        try {
             await axios.post('/api/users/verifyemail',{token});
            
            setVerified(true);
        } catch (error) {
            setError(true);
           
        }

    }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    setToken(urlToken || "");
}, []);


    useEffect(()=>{
        console.log(token)
        if(token.length>0){
            verifyUserEmail();
        }
    },[token]);


    return(
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className="text-4xl m-10">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black m-10">{token?`${token}`:"no token"}</h2>


        {verified &&(
           
  <div>
    <h2 className="text-2xl text-green-600  m-10">Email Verified</h2>
    <Link className="text-blue-600 text-center ml-20" href="/login">Login</Link>
  </div>
)}
                
            



               {error && (
                 <div>
                    <h2 className="text-2xl text-red-500">Verification failed</h2>

                    </div>
            )}



        </div>
    )

}


