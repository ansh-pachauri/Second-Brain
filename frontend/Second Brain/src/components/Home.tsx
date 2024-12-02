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
        <div className="flex flex-wrap gap-4 justify-center">
          <Card title="Obsesed" type="twitter"
           link="https://twitter.com/hamptonism/status/1859921077994156519" contentId="123" />
          {content?.map(({type, title, link, _id}) => {
            return <Card 
              key={_id}
              contentId={_id} 
              type={type} 
              title={title} 
              link={link} 
            />
          })}
        </div>
      </div>
    </div>
  );
}
