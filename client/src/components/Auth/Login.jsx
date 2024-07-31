import "./Auth.css";
import ImgLogo from "../../assets/medi-logo.png"
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alterText, setAlterText] = useState(undefined);

    const {setLoginInfo} = useContext(Context);

    const navigate = useNavigate();

    async function loginFunc(){
        if(email==="" || password===""){
            setAlterText("Please Fill All the Details")
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/login", {email, password})
            .then((res)=>{
                setAlterText(res?.data?.message)
                setLoginInfo({status: true, username: res?.data?.username, user: res?.data?.user})
                navigate('/feed');
            }).catch((error)=>{
                setAlterText(error?.response?.data?.message)
            })
        }
    }
    return(
        <div className="auth-main-div">
            <div className="auth-left-div">
                <div className="auth-heading">Login</div>
                <div className="auth-divs">
                    <div className="auth-label">Email</div>
                    <input onChange={(e)=>setEmail(e.target.value)} className="auth-input" type="email" placeholder="Enter Email"/>
                </div>
                <div className="auth-divs">
                    <div className="auth-label">Password</div>
                    <input onChange={(e)=>setPassword(e.target.value)} className="auth-input" type="password" placeholder="Enter Password"/>
                </div>
                <div>
                    <div className="auth-label auth-label1">{alterText}</div>
                </div>
                <div className="auth-divs auth-btn-div">
                    <button onClick={loginFunc} className="auth-btn">Login</button>
                </div>
            </div>
            <div className="auth-right-div">
                <img className="medi-logo" src={ImgLogo} alt="" />
            </div>
        </div>
    )
}
export default Login;