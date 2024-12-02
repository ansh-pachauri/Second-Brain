import { Twitter } from "../icons/Twitter";
import { Brian } from "../icons/Brain";
import { Youtube } from "../icons/Youtube";
import { SideBarItems } from "./SideBarItems";

export const SideBar = () => {
  return (
    <>
      <div className="h-screen bg-white border-r w-[350px] fixed">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <Brian />
            <h1 className="text-3xl whitespace-nowrap font-bold italic items-start m-8 text-[#5143E4]">
              BrainOpedia
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start ">
        <SideBarItems text="Youtube" icon={<Youtube />} />
        <SideBarItems text="Twitter" icon={<Twitter />} />
        </div>
        
      </div>
    </>
  );
};
