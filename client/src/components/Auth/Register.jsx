import "./Auth.css";
import ImgLogo from "../../assets/medi-logo.png"
import { useState } from "react";
import axios from "axios";

function Register(){

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alterText, setAlterText] = useState(undefined);

    async function createAccountFunc(){
        if(fname==="" || lname==="" || email==="" || password==="" || confirmPassword===""){
            setAlterText("Please Fill All the Details")
        }
        else if(password!==confirmPassword){
            setAlterText("Password Must be Same")
        }
        else{
            let username = email.replace("@gmail.com", "");

            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/register", {username ,fname, lname, email, password, confirmPassword})
            .then((res)=>{
                setAlterText(res?.data?.message)
            }).catch((error)=>{
                setAlterText(error?.response?.data?.message)
            })
        }
    }

    return(
        <div className="auth-main-div">
            <div className="auth-left-div">
                <div className="auth-heading">Sign Up</div>
                <div className="auth-div-1 auth-divs">
                    <div>
                        <div className="auth-label">First Name</div>
                        <input onChange={(e)=>setFname(e.target.value)} className="auth-input" placeholder="Enter First Name" type="text" />
                    </div>
                    <div className="auth-left-margin">
                        <div className="auth-label">Last Name</div>
                        <input onChange={(e)=>setLname(e.target.value)} className="auth-input" type="text" placeholder="Enter Last Name"/>
                    </div>
                </div>
                <div className="auth-divs">
                    <div className="auth-label">Email</div>
                    <input onChange={(e)=>setEmail(e.target.value)} className="auth-input" type="email" placeholder="Enter Email"/>
                </div>
                <div className="auth-divs">
                    <div className="auth-label">Password</div>
                    <input onChange={(e)=>setPassword(e.target.value)} className="auth-input" type="password" placeholder="Enter Password"/>
                </div>
                <div className="auth-divs">
                    <div className="auth-label">Repeat Password</div>
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} className="auth-input" type="password" placeholder="Enter Repeat Password"/>
                </div>
                <div>
                    <div className="auth-label auth-label1">{alterText}</div>
                </div>
                <div className="auth-divs auth-btn-div">
                    <button onClick={createAccountFunc} className="auth-btn">Create Account</button>
                </div>
            </div>
            <div className="auth-right-div">
                <img className="medi-logo" src={ImgLogo} alt="" />
            </div>
        </div>
    )
}
export default Register;