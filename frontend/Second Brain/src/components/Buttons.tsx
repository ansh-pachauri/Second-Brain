import { Plusicon } from "../icons/Plusicon"
import { Share } from "../icons/Share"

export default function Buttons({onClick}:{onClick:()=>void}){
    return <div className="flex flex-row gap-4">
        <button
        className="flex flex-row items-center justify-center bg-[#5143E4] text-white p-2 rounded-md text-lg" 
        onClick={onClick}
        ><Share size="md"/> Share Brain</button>
        <button
        className="flex flex-row items-center justify-center bg-[#5143E4] text-white p-2 rounded-md text-lg "
        ><Plusicon size="md"/>Add Content</button>
    </div>
}