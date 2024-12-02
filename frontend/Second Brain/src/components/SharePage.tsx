import axios from "axios";
import { Copy } from "../icons/Copy";
import { X } from "../icons/X";
export const SharePage = ({ onClose }: { onClose: () => void }) => {
  
  const handleShare = ()=>{
    axios.post("http://localhost:3000/api/v1/brain/share",{
      headers:{
        Authorization: localStorage.getItem("token")
      }
    })
    alert("Link Copied")
  }
  return (
    <div className="border-2 border-gray-300 bg-white rounded-md p-4 shadow-md w-1/3 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-row justify-end w-full">
          <X onClick={onClose} />
        </div>
        <h1 className="text-2xl font-bold">Share Your Second Brain</h1>

        <p className="text-lg text-center">
          Share your second brain with your friends and family.They'll be able
          to see your brain and add to it.
        </p>
        <button className="flex flex-row items-center justify-center bg-[#5143E4] text-white p-2 rounded-md text-lg" onClick={handleShare}>
          <Copy size="lg" />
          Share Link
        </button>
      </div>
    </div>
  );
};
