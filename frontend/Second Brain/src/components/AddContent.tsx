import { X } from "../icons/X";
import { Plusicon } from "../icons/Plusicon";
import { useRef } from "react";
import axios from "axios";
export default function AddContent({ onClose }: { onClose: () => void }) {

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    
    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const tags = tagsRef.current?.value;


        await axios.post("http://localhost:3000/api/v1/content",{
            title,
            link,
            tags
        },{
            headers:{
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
    }
  return (
    <div className="border-2 border-gray-300 bg-white rounded-md p-4 shadow-md w-1/3 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-row justify-end w-full">
         <X onClick={onClose} />
        </div>
      <input ref={titleRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Title" />
      <input ref={linkRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Link" />
      <input ref={tagsRef} className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Tags (eg. #youtube, #twitter)" />

      <button onClick={addContent}
      className="flex flex-row items-center justify-center bg-[#5143E4] text-white p-2 rounded-md text-lg"
      ><Plusicon size="lg" />Add Content</button>
    </div>
    </div>
    
  );
}
