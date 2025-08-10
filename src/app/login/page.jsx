"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import  axios  from 'axios';
import  {useEffect}  from 'react';
import toast from 'react-hot-toast';




function LoginPage() {
  const router = useRouter();
    const [user , setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled,setButtonDisabled] = useState(false)
    
    const [loading , setLoading] = useState(false)


    const onLogin = async() =>{
      try {
        setLoading(true);
       const response= await axios.post("/api/users/login",user);
      
        toast.success("Login success");
        router.push("/profile");
      } catch (error) {
      
        toast.error("incorrect username or password");
      } finally{
        setLoading(false);
      }
    }

    const handleForgotPassword = async () => {
  try {
   
     router.push("/forgotPassword")
    
    
  } catch (error) {
    toast.error("Try again");
  }
}


  

    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false);
      } else{
        setButtonDisabled(true);
      }

    },[user]);


  return (
    <div className='flex justify-center  items-center min-h-screen '>
     <div className=' flex justify-center shadow-xl   w-110 h-150 rounded-xl bg-neutral-800    '>
        <div className='flex flex-col items-center justify-cente mt-17 min-h-screen'>
     <h1 className='text-5xl mb-15'>{loading?"Processing...":"Login"}</h1>
      <hr />
   
  
   

     <div className='flex flex-col items-start'>

          <label
          className='ml-[2px] mb-1'
           htmlFor="email">Email</label>
     <input 
     className='bg-white p-2 text-black border-3 border-gray-300 w-80 rounded-lg mb-10 focus:outline-none focus:border-gray-600'
     type="text"
     id="email"
     value={user.email}
     onChange={(e)=> setUser({...user, email:e.target.value})}
     placeholder='email'
      />
        </div>
  

      <div className='flex flex-col items-start'>
     <label
     className='ml-[2px] mb-1'
      htmlFor="password">Password</label>
     <input 
     className='bg-white p-2 text-black border-3 w-80 border-gray-300 rounded-lg mb-15 focus:outline-none focus:border-gray-600'
     type="password"
     id="password"
     value={user.password}
     onChange={(e)=> setUser({...user, password:e.target.value})}
     placeholder='password'
      />
      </div>
  
      <div className='flex mr-60 mt-5 '>
       <button
       onClick={onLogin}
       className={`bg-blue-600 text-black  w-20 rounded-lg mb-10    p-2 ${buttonDisabled?"disabled opacity-50 cursor-not-allowed":"cursor-pointer hover:bg-blue-700  "} `}>Login</button>
      </div>
  
       <Link 
       className=' hover:underline hover:underline-offset-2 text-blue-500'
       href="/signup">Visit signup page</Link>

      <button
  onClick={handleForgotPassword}
  className="text-blue-500 hover:underline hover:underline-offset-2 mt-5 mb-5 bg-transparent border-none cursor-pointer"
>
  Forgot password?
</button>

    </div>
    </div>
    </div>
   
 
  )
}

export default LoginPage;
