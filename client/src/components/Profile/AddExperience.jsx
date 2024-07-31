import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { Context } from "../../Context";
import { useContext, useState } from "react";
import "../Feed.css";
import axios from "axios";

function AddExperience() {

    const { username } = useParams();
    const { loginInfo, setLoginInfo } = useContext(Context);
    const navigate = useNavigate();

    const user = loginInfo.user;

    const [institute, setInstitute] = useState("");
    const [role, setRole] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");

    const [alterText, setAlterText] = useState(undefined);


    async function EditProfileFunc(){
        if(institute==="" || role==="" || startYear==="" || endYear===""){
            setAlterText("Please Fill All the Details")
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/experience/add", {institute, role, startYear, endYear, username})
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
                    <div className="auth-heading">Experience</div>
                    <div className="auth-divs">
                        <div className="auth-label">Institute</div>
                        <input onChange={(e)=>setInstitute(e.target.value)} className="auth-input" type="text" placeholder="Enter Institute Name" />
                    </div>
                    <div className="auth-divs">
                        <div className="auth-label">Role</div>
                        <input onChange={(e)=>setRole(e.target.value)} className="auth-input" type="text" placeholder="Enter Role" />
                    </div>
                    <div className="auth-div-1 auth-divs">
                        <div>
                            <div className="auth-label">Start Year</div>
                            <input onChange={(e)=>setStartYear(e.target.value)} className="auth-input" placeholder="Enter Start Year" type="text" />
                        </div>
                        <div className="auth-left-margin">
                            <div className="auth-label">End Year</div>
                            <input onChange={(e)=>setEndYear(e.target.value)} className="auth-input" type="text" placeholder="Enter End Year" />
                        </div>
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

export default AddExperience;