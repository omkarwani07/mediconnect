import { useNavigate, useParams } from "react-router-dom";
import "./Connection.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Connection(){

    const { username } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    async function getConnections(){
        await axios.post(process.env.REACT_APP_BASE_URL+"/auth/connection/show", {username})
        .then((res)=>{
            console.log(res);
            // setAlterText(res?.data?.message)
            setUser(res?.data?.user);
        }).catch((error)=>{
            console.log(error);
            // setAlterText(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        getConnections();
    }, [])

    useEffect(()=>{
        console.log(user);
    }, [user])

    return(
        <div>
            Connection Page
        </div>
    )
}
export default Connection;