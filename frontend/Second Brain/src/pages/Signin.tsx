
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Brian } from "../icons/Brain";

export const Signin = () => {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signin(){
        const userName = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/signin`,{
            userName,
            password
        })

        const jwtToken = response.data.token;
        localStorage.setItem("token", jwtToken);
    }
    return <>
    <div className="flex flex-col items-center justify-center w-full  ">
       <Brian />
       <h1 className="text-6xl font-bold text-[#5143E4]">BrainOpedia</h1>
       <p className="text-gray-500 font-semibold text-xl mt-4">Please SignIn to continue with your account details</p>
    <div className="border-2 border-gray-300 items-center mt-10 justify-center bg-white rounded-md p-4 shadow-md w-1/3 mx-auto">
    
        <div className="flex flex-col items-center justify-center space-y-4">
        
      <input ref={usernameRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Username" />
      <input ref={passwordRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Password" />
      

      <button onClick={()=>{signin(); navigate("/signin")}} 
      className="flex flex-row items-center justify-center w-full bg-[#5143E4] text-white p-2 rounded-md text-lg"
      >SignIn</button>
      
    </div>
    </div>
    </div>
    </>
}