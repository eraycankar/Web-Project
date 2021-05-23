import React,{useState,useEffect, useRef} from "react";
import logo from "../assets/shiftplan_1.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {signoutSuccess} from "../redux/authAction.js"
import { useTranslation } from "react-i18next";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const TopBar = props => {

    const {t} = useTranslation();
    const { username , isSignedIn , image} = useSelector((store) => ({
      
        isSignedIn: store.isSignedIn,
        username: store.username,
        image: store.image
      
    }));

    const menuArea = useRef(null);

    const [menuVisible,setMenuVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('click',menuClickTracker);
        return () => {
          document.removeEventListener('click', menuClickTracker);
        }
      },[isSignedIn]);

    const menuClickTracker = (event) => {
      if(menuArea.current === null || !menuArea.current.contains(event.target)){
        setMenuVisible(false);
      }
    }

    const dispatch = useDispatch();
    
    const  onSignoutSuccess  = () => {
      dispatch(signoutSuccess());
    };
    
    
    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/signin">
            {t("Sign In")}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/signup">
            {t("Sign Up")}
          </Link>
        </li>
      </ul>
    );
    if (isSignedIn) {
      let dropDownClass = 'dropdown-menu p-0 shadow'
      if(menuVisible){
        dropDownClass +=' show';
      }

      links = (
        <ul className="navbar-nav ml-auto" ref = {menuArea}>
          <Link to={`/myshifts/${username}`} className="nav-link d-flex mr-4" replace>
              MyShifts
          </Link>
          <li className="nav-item dropdown">
            <div className="d-flex"  style={{ cursor: "pointer" }} onClick={()=>{setMenuVisible(true)}}>
              <ProfileImageWithDefault image = {image} width="32" height="32" className="rounded-circle m-auto"/>
              <span className="nav-link dropdown-toggle">{username}</span>
            </div>
            <div className={dropDownClass}>
              <Link className="dropdown-item d-flex p-2" to={`/user/${username}`}>
                <span className="material-icons text-warning mr-2">
                  person
                </span>
                {t('My Profile')}
              </Link>

              <Link
               to ="/signin"
                className="dropdown-item d-flex p-2"
                onClick={onSignoutSuccess}
                style={{ cursor: "pointer" }}
              >
                <span className="material-icons text-danger mr-2">
                  logout
                </span>
                {t("Sign Out")}
              </Link>
            </div>
          </li>
        </ul>
      );
    }

    return (
      <div className="shadow-sm bg-light ">
        <nav className="navbar navbar-expand navbar-light bg-light container">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="40" alt="Shiftplan1"></img> ShiftPlan
          </Link>
          {links}
        </nav>
      </div>
    );
  
}

// const mapStateToProps = store => {
//   return {
//     isSignedIn: store.isSignedIn,
//     username: store.username
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onSignoutSuccess: () => dispatch(signoutSuccess())
//     };
// }

export default TopBar;
 
