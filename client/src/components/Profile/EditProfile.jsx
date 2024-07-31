import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { Context } from "../../Context";
import { useContext, useState } from "react";
import "../Feed.css";
import axios from "axios";

function EditProfile() {

    const { username } = useParams();
    const { loginInfo, setLoginInfo } = useContext(Context);
    const navigate = useNavigate();

    const user = loginInfo.user;

    const [fname, setFname] = useState(user?.fname);
    const [lname, setLname] = useState(user?.lname);
    const [bio, setBio] = useState(user?.bio);

    const [alterText, setAlterText] = useState(undefined);


    async function EditProfileFunc(){
        if(fname===user?.fname && lname===user?.lname && bio===user?.bio){
            setAlterText("Please Do Some Change to Reflect in Account")
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/edit", {username, fname, lname, bio})
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
                    <div className="auth-heading">Edit Account</div>
                    <div className="auth-div-1 auth-divs">
                        <div>
                            <div className="auth-label">First Name</div>
                            <input value={fname} onChange={(e)=>setFname(e.target.value)} className="auth-input" placeholder="Enter First Name" type="text" />
                        </div>
                        <div className="auth-left-margin">
                            <div className="auth-label">Last Name</div>
                            <input value={lname} onChange={(e)=>setLname(e.target.value)} className="auth-input" type="text" placeholder="Enter Last Name" />
                        </div>
                    </div>
                    <div className="auth-divs">
                        <div className="auth-label">Bio</div>
                        <input value={bio} onChange={(e)=>setBio(e.target.value)} className="auth-input" type="email" placeholder="Enter Bio" />
                    </div>
                    <div>
                        <div className="auth-label auth-label1">{alterText}</div>
                    </div>
                    <div className="auth-divs auth-btn-div">
                        <button onClick={EditProfileFunc} className="auth-btn">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;