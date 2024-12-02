import { useEffect, useState } from "react";
import axios from "axios";

export default function useLink(){
    const [link, setLink] = useState("");

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/brain/:shareLink`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setLink(response.data.link);
        })
    },[])

    return link;
}