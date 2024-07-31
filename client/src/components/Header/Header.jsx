import { useContext } from "react";
import { Context } from "../../Context";
import "./Header.css";
import {Link} from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Header(){

    const {loginInfo} = useContext(Context);

    return(
        <div className="header-main-div">
            <div className="header-left-div">
                {
                    loginInfo.status ? 
                        <Link to='/feed' className="website-name">MediConnect</Link>
                    :
                        <Link to='/' className="website-name">MediConnect</Link>
                }
            </div>
            {
                loginInfo.status ? 
                    <div className="header-right-div">
                        <Link className="header-links" to='/feed'>Home</Link>
                        <Link className="header-links" to='/feed'>Chat</Link>
                        <Link className="header-links" to={`/connection/${loginInfo.username}`}>Connect</Link>
                        <Link className="header-links" to='/jobs'>Jobs</Link>
                        <Link className="header-links header-icons" to={`/profile/${loginInfo.username}`}><CgProfile /></Link>
                    </div>
                : 
                <div className="header-right-div">
                    <Link className="nav-links" to='/login'>Login</Link>
                    <Link className="nav-links" to='/register'>Sign Up</Link>
                </div>
            }
        </div>
    )
}

export default Header;