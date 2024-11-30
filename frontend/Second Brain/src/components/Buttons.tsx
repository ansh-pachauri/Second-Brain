import { Plusicon } from "../icons/Plusicon";
import { Share } from "../icons/Share";
import { useState } from "react";
import { SharePage } from "./SharePage";
import AddContent from "./AddContent";

export default function Buttons() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  return (
  <>
    <div className="flex flex-row gap-4">
      <button
        className="flex flex-row items-center justify-center bg-[#5143E4] text-white p-2 rounded-md text-lg"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Share size="md" /> Share Brain
      </button>
      <button className="flex flex-row items-center justify-center bg-[#5143E4] text-white p-2 rounded-md text-lg" onClick={() => {
        setIsAddContentOpen(!isAddContentOpen);
      }}>
        <Plusicon size="md" />
        Add Content
      </button>
    </div> 
    {isOpen && (
    <div className="fixed inset-0 flex bg-black/50 items-center justify-center">
        
        <SharePage
          onClose={() => {
            setIsOpen(false);
          }}
        />
        
        
      </div>
    )}

    {isAddContentOpen && ( <div className="fixed inset-0 flex bg-black/50 items-center justify-center">
        
        <AddContent
          onClose={() => {
            setIsAddContentOpen(false);
          }}
        />
        
        
      </div>)}
  </>
  )
}