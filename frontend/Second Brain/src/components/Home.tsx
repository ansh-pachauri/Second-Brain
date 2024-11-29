import { Brian } from "../icons/Brain"
import Buttons from "./Buttons"
import { SharePage } from "./SharePage"
export default function Home() {
    return (
        <div>
            <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <Brian/>
                <h1 className="text-4xl font-bold italic items-start m-8 text-[#5143E4]">Second Brain </h1>    
            </div>
            <div className="flex flex-row items-center justify-center m-8">
                <Buttons />
            </div>
        </div>
        <SharePage />
        </div>
        
    )
}             