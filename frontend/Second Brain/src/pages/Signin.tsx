
import axios from "axios";
import { useRef } from "react";

export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signin(){
        const userName = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post("http://localhost:3000/api/v1/signin",{
            userName,
            password
        })

        const jwtToken = response.data.token;
        localStorage.setItem("token", jwtToken);
    }
    return <>
    <div className="border-2 border-gray-300 bg-white rounded-md p-4 shadow-md w-1/3 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
        
      <input ref={usernameRef}  className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Username" />
      <input ref={passwordRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Password" />
      

      <button onClick={signin}
      className="flex flex-row items-center justify-center w-full bg-[#5143E4] text-white p-2 rounded-md text-lg"
      >SignIn</button>
    </div>
    </div>
    </>
}