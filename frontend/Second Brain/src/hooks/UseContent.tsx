import { useEffect, useState } from "react";
import axios from "axios";
export default function useContent(){
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/content", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
          .then((response)=>{
            setContent(response.data.content);
        })
    }, []);

    return content;
}