import { useEffect, useState } from "react";
import axios from "axios";

export default function useContent(){
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/content`, {
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