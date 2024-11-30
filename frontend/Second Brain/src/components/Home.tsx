import { Brian } from "../icons/Brain";
import Buttons from "./Buttons";
import { Card } from "./Card";
import SideBar from "./SideBar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Brian />
          <h1 className="text-4xl font-bold italic items-start m-8 text-[#5143E4]">
            Second Brain{" "}
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center m-8">
          <Buttons />
        </div>
      </div>
      <div>
        <SideBar />
      </div>
      <div className="flex flex-wrap flex-row justify-center">
        <Card
          type="twitter"
          title="My First Tweet"
          link="https://twitter.com/elonmusk/status/1862752573830115448"
        />

        <Card
          type="youtube"
          title="Amazing Video"
          link="https://www.youtube.com/watch?v=StMltAX0mp0"
        />

        <Card
          type="youtube"
          title="Amazing Video"
          link="https://www.youtube.com/watch?v=StMltAX0mp0"
        />
      </div>
    </>
  );
}
