import { useEffect, useState } from "react";
import axios from "axios";

export default function useLink(){
    const [link, setLink] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/brain/:shareLink",{
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