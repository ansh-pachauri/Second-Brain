import { X } from "../icons/X";
import { Plusicon } from "../icons/Plusicon";
export default function AddContent({ onClose }: { onClose: () => void }) {   
  return (
    <div className="border-2 border-gray-300 bg-white rounded-md p-4 shadow-md w-1/3 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-row justify-end w-full">
         <X onClick={onClose} />
        </div>
      <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Title" />
      <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Link" />
      <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Tags (eg. #youtube, #twitter)" />

      <button 
      className="flex flex-row items-center justify-center bg-[#5143E4] text-white p-2 rounded-md text-lg"
      ><Plusicon size="lg" />Add Content</button>
    </div>
    </div>
    
  );
}
