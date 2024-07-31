import { useNavigate } from "react-router-dom";
import "./Feed.css";
import { Context } from "../Context";
import { useContext } from "react";
import { BiLike } from "react-icons/bi";
import "./Profile/Profile.css";

function Feed(){
    
    const {loginInfo} = useContext(Context);
    const user = loginInfo.user;

    const navigate = useNavigate();

    return(
        <div className="feed-main-div">
            <div className="feed-left-div">
                <div className="create-post-div">
                    <button onClick={()=>navigate(`/post/create/${loginInfo.username}`)} className="feed-btn">Create New Post</button>
                </div>
                <div className="feed-main-cards-div">
                    <div>
                        {
                            user.posts.map((edu)=>(
                                <div key={edu._id} className="profile-page-card-div1 profile-page-card-div2 profile-page-card-div3">
                                    {/* <div className="profile-page-card-bold-label">{edu.institute}</div> */}
                                    <img className="profile-page-card-image-1 profile-page-card-image-3" src={edu.image} alt="" />
                                    <div className="profile-page-card-desc-1 profile-page-card-desc-2">{edu.desc}</div>
                                    <div className="profile-page-card-more-1">
                                        <BiLike className="feed-page-like-icon-1"/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="feed-right-div">
                <div className="ads-banner">
                    Sponsored Ads
                </div>
                <div className="ads-banner">
                    Sponsored Ads
                </div>
            </div>
        </div>
    )
}
export default Feed;