import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { Context } from "../../Context";
import { useContext, useState } from "react";
import "../Feed.css";
import axios from "axios";

function AddCertificate() {

    const { username } = useParams();
    const { loginInfo, setLoginInfo } = useContext(Context);
    const navigate = useNavigate();

    const user = loginInfo.user;

    const [title, setTitle] = useState("");
    const [institute, setInstitute] = useState("");
    const [issue, setIssue] = useState("");

    const [alterText, setAlterText] = useState(undefined);


    async function EditProfileFunc(){
        if(institute==="" || title==="" || issue===""){
            setAlterText("Please Fill All the Details")
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/certificate/add", {institute, title, issue, username})
            .then((res)=>{
                setAlterText(res?.data?.message)
                setLoginInfo({status: true, username: res?.data?.username, user: res?.data?.user})
                navigate(`/profile/${loginInfo.username}`);
            }).catch((error)=>{
                setAlterText(error?.response?.data?.message)
            })
        }
    }

    return (
        <div className="edit-profile-main-div">
            <div className="edit-profile-main-div1">
                <div className="auth-left-div">
                    <div className="auth-heading">Certificate</div>
                    <div className="auth-divs">
                        <div className="auth-label">Title</div>
                        <input onChange={(e)=>setTitle(e.target.value)} className="auth-input" type="text" placeholder="Enter Certificate Title" />
                    </div>
                    <div className="auth-divs">
                        <div className="auth-label">Institute</div>
                        <input onChange={(e)=>setInstitute(e.target.value)} className="auth-input" type="text" placeholder="Enter Institute Name" />
                    </div>
                    <div className="auth-divs">
                        <div className="auth-label">Issue</div>
                        <input onChange={(e)=>setIssue(e.target.value)} className="auth-input" type="text" placeholder="Enter Issue Year" />
                    </div>
                    <div>
                        <div className="auth-label auth-label1">{alterText}</div>
                    </div>
                    <div className="auth-divs auth-btn-div">
                        <button onClick={EditProfileFunc} className="auth-btn">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCertificate;