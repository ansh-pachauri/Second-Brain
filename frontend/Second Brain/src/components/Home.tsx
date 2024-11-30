import { Card } from "./Card";
import { SideBar } from "./SideBar";
import Buttons from "./Buttons";
import useContent from "../hooks/UseContent";

export default function Home() {
    const content = useContent();
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 min-h-screen  bg-gray-100 ml-[350px]">
        <div className="flex flex-row items-end justify-end m-8">
          <Buttons />
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <Card
            type="twitter"
            title="My First Tweet"
            link="https://twitter.com/elonmusk/status/1862752573830115448"
          />

          {content?.map(({type, title, link})=>{
            return <Card type={type} title={title} link={link} />
          })}
        </div>
      </div>
    </div>
  );
}
