import { Pensil } from "../icons/Pensil";
import { Share } from "../icons/Share";
import { Delet } from "../icons/Delet";
import axios from "axios";
    
interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId: string;
}

export const Card = ({ title, link, type, contentId }: CardProps) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/content/${contentId}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  

 

  return (
    <div >
        
        <div className={`border-2 border-gray-300 bg-white rounded-md p-4 shadow-md mx-auto ${
        type === "youtube" ? "w-[300px] h-[320px]" : "w-[400px] h-[100%]"
    }`}>
      <div className="flex flex-row justify-between items-center mb-2">
        <div>
          <Pensil size="lg" />
        </div>
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div>
          <Share size="lg"  />
        </div>
        <div>
          <Delet onClick={handleDelete} size="lg" />
        </div>
      </div>
      <div className={`${
          type === "youtube" ? "h-[240px]" : "h-[100%]"
      }`}>
        {type === "youtube" && (
          <iframe
            width="100%"
            height="100%"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet h-full">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
    </div>
    
  );
};
