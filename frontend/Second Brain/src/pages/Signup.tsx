import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signup(){
        const userName = usernameRef.current?.value;
        const password = passwordRef.current?.value;

         await axios.post("http://localhost:3000/api/v1/signup",{
            userName,
            password
        })

        
    }
    return <>
    <div className="border-2 border-gray-300 items-center justify-center bg-white rounded-md p-4 shadow-md w-1/3 mx-auto my-60">
        <div className="flex flex-col items-center justify-center space-y-4">
        
      <input ref={usernameRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Username" />
      <input ref={passwordRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Password" />
      

      <button onClick={()=>{signup(); navigate("/signin")}} 
      className="flex flex-row items-center justify-center w-full bg-[#5143E4] text-white p-2 rounded-md text-lg"
      >SignUp</button>
      
    </div>
    </div>
    </>
}