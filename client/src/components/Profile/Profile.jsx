import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";

function Profile() {

    const { username } = useParams();
    const navigate = useNavigate();

    const {loginInfo} = useContext(Context);
    
    const user = loginInfo.user;

    // useEffect(()=>{
    //     console.log(user);
    // }, [])

    return (
        <>
            {
                user ? 
                <div className="profile-page-main-div">
                    <div>
                        <div className="profile-main-div1">
                            <div><RiAccountCircleFill className="profile-user-logo" /></div>
                            <div className="profile-main-div1-inner">
                                <div className="profile-name-label">{user?.fname} {user?.lname}<span className="user-name-label">@{username}</span> <div className="profile-edit-icon1"><MdEdit onClick={()=>navigate(`/edit/${loginInfo.username}`)} className="profile-edit-icon" /></div></div>
                                <div className="follower-following-div">
                                    <div><span className="profile-bold-div">Followers:</span> {user?.followers?.length}</div>
                                    <div className="following-div-1"><span className="profile-bold-div">Following:</span> {user?.following?.length}</div>
                                </div>
                                <div>Bio: {user?.bio}</div>
                            </div>
                        </div>
                        <div className="line-div"></div>
                        <div className="profile-section-divs1">
                            <div className="profile-section-heading-label">Your Posts</div>
                            <div>
                                {
                                    user.posts.map((edu)=>(
                                        <div key={edu._id} className="profile-page-card-div1 profile-page-card-div2">
                                            {/* <div className="profile-page-card-bold-label">{edu.institute}</div> */}
                                            <img className="profile-page-card-image-1" src={edu.image} alt="" />
                                            <div className="profile-page-card-desc-1">{edu.desc}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="profile-section-divs1">
                            <div className="profile-section-heading-label">Education</div>
                            <div>
                                {
                                    user.education.map((edu)=>(
                                        <div key={edu._id} className="profile-page-card-div1">
                                            <div className="profile-page-card-bold-label">{edu.institute}</div>
                                            <div>{edu.degree}</div>
                                            <div className="profile-page-card-years-div1">
                                                <div>{edu.startYear}</div> - 
                                                <div>{edu.endYear}</div>
                                            </div>
                                            <div><span className="profile-page-card-bold-label">Specialization: </span>{edu.specialization}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="profile-section-add-btn-div1">
                                <button onClick={()=>navigate(`/education/${loginInfo.username}`)} className="feed-btn">Add Education</button>
                            </div>
                        </div>
                        <div className="profile-section-divs1">
                            <div className="profile-section-heading-label">Experience</div>
                            <div>
                                {
                                    user.experience.map((edu)=>(
                                        <div key={edu._id} className="profile-page-card-div1">
                                            <div className="profile-page-card-bold-label">{edu.institute}</div>
                                            <div>{edu.role}</div>
                                            <div className="profile-page-card-years-div1">
                                                <div>{edu.startYear}</div> - 
                                                <div>{edu.endYear}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="profile-section-add-btn-div1">
                                <button onClick={()=>navigate(`/experience/${loginInfo.username}`)} className="feed-btn">Add Experience</button>
                            </div>
                        </div>
                        <div className="profile-section-divs1">
                            <div className="profile-section-heading-label">Certificate</div>
                            <div>
                                {
                                    user.certification.map((edu)=>(
                                        <div key={edu._id} className="profile-page-card-div1">
                                            <div className="profile-page-card-bold-label">{edu.title}</div>
                                            <div>{edu.institute}</div>
                                            <div><span className="profile-page-card-bold-label">Issue: </span>{edu.issue}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="profile-section-add-btn-div1">
                                <button onClick={()=>navigate(`/certificate/${loginInfo.username}`)} className="feed-btn">Add Certificate</button>
                            </div>
                        </div>
                    </div>
                </div>
                : 
                <div className="error-msg-div">
                    Login to View Account
                </div>
            }
        </>
    )
}
export default Profile;