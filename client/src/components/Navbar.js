import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { AppContext } from "../contexts/appContext";
import { useContext, useState } from "react";

const Navbar = () => {
  const { toggleSideBar, logOutUser ,user} = useContext(AppContext);
  const [showLogOut, setShowLogOut] = useState(false)
  
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">DashBoard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogOut(!showLogOut)}
          >
            <FaUserCircle /> {user.name} <FaCaretDown />
          </button>
          <div className={showLogOut ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logOutUser}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
