import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";

function Home(){

    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/login');
    }, []);

    return(
        <div>
            Home Page
        </div>
    )
}
export default Home;