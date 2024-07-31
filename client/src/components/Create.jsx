import { useContext, useEffect, useState } from "react";
import "./Feed.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context";

function Create(){ 

    const { username } = useParams();
    const navigate = useNavigate();

    const {setLoginInfo} = useContext(Context);

    const [desc, setDesc] = useState(""); 

    const [image, setImage] = useState(undefined);
    const [selectedFile, setSelectedFile] = useState(null);

    const [alterText, setAlterText] = useState(undefined);


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = async () => {

        if(desc===""){
            setAlterText("Please Fill All the Details");
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
    
        await axios.post(process.env.REACT_APP_BASE_URL+'/file/upload', formData)
        .then(response => {
            setImage(response.data.imagePath);
        })
        .catch(error => {
            setAlterText(error?.response?.data?.message);
        });
    }

    async function createPost(){
        await axios.post(process.env.REACT_APP_BASE_URL+"/auth/post/create", {desc, image, username})
        .then((res)=>{
            setAlterText(res?.data?.message)
            setLoginInfo({status: true, username: res?.data?.username, user: res?.data?.user})
            navigate('/feed');
        }).catch((error)=>{
            setAlterText(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        createPost();
    }, [image])

    return(
        <div className="create-post-main-div">
            <div className="create-post-div1">
                <div className="auth-heading">Create New Post</div>
                <div className="auth-divs">
                    <div className="auth-label">Description</div>
                    <textarea onChange={(e)=>setDesc(e.target.value)} rows={5} className="auth-input" placeholder="Description"/>
                </div>
                <div className="auth-divs">
                    <div className="auth-label">Image</div>
                    <input type="file" onChange={handleFileChange} accept="image/*" className="auth-input"/>
                </div>
                <div>
                    <div className="auth-label auth-label1">{alterText}</div>
                </div>
                <div className="auth-divs auth-btn-div">
                    <button onClick={handleUpload} className="auth-btn">Post</button>
                </div>
            </div>
        </div>
    )
}
export default Create;