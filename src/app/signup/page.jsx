"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import  axios  from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';



function SignupPage() {
    const router = useRouter();
    const [user , setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [loading, setLoading] = React.useState(false);

    const [buttonDisabled , setButtonDisabled] = React.useState(false);
 


    const onSignup = async() =>{
      try {
        setLoading(true);
       const response= await axios.post("api/users/signup",user);
      
       router.push("/login");
       toast.success('signup successfully')
       toast.success('Verification link sent to your email! Check your inbox/email.')
      } catch (error) {
      
        toast.error("User aleady exists");
      }finally{
        setLoading(false)
      }

    }
    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    },[user]);


  return (
    <div className='flex justify-center  items-center min-h-screen '>
     <div className=' flex justify-center shadow-xl   w-110 h-150 rounded-xl bg-neutral-800  '>
        <div className='flex flex-col items-center justify-cente mt-17 min-h-screen'>
     <h1 className='text-5xl mb-8'>{loading ? "Processing..." :"Signup"}</h1>
      <hr />
     
     <div className="flex flex-col items-start" >
     <label
     className='ml-[2px] mb-1'
      htmlFor="username">Username</label>
     <input 
     className='bg-white p-2 text-black border-3 border-gray-300 rounded-lg mb-6 focus:outline-none w-80 focus:border-gray-600'
     type="text"
     id="username"
     value={user.username}
     onChange={(e)=> setUser({...user, username:e.target.value})}
     placeholder='username'
      />
     
     </div>
  
   

     <div className='flex flex-col items-start'>

          <label
          className='ml-[2px] mb-1'
           htmlFor="email">Email</label>
     <input 
     className='bg-white p-2 text-black border-3 border-gray-300 w-80 rounded-lg mb-6 focus:outline-none focus:border-gray-600'
     type="text"
     id="email"
     value={user.email}
     onChange={(e)=> setUser({...user, email:e.target.value})}
     placeholder='email'
      />
        </div>
  

     <div className="flex flex-col items-start relative w-80"> {/* relative + width */}
  <label className="ml-[2px] mb-1" htmlFor="password">Password</label>
  <input 
    className="bg-white p-2 text-black border-3 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 pr-10 w-full"  // pr-10 for padding right
    id="password"
    type={"password"}
    value={user.password}
    onChange={(e) => setUser({ ...user, password: e.target.value })}
    placeholder="password"
  />


  
      <div className='flex mr-60 mt-5 '>
       <button
       onClick={onSignup}
       className= {` bg-green-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600   p-2  ${buttonDisabled?'disabled opacity-50  cursor-not-allowed':'cursor-pointer   hover:bg-green-600 '}`} >Sign Up</button>
      </div>
  
       <Link 
       className=' hover:underline hover:underline-offset-2 text-blue-500'
       href="/login">Visit login page</Link>
    </div>
    </div>
    </div>
    </div>
  
   
 
  )
}
  




export default SignupPage;
