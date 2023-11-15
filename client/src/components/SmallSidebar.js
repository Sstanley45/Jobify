import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../contexts/appContext";
import Logo from "./Logo";
import { useContext } from "react";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
   const {showSideBar, toggleSideBar} = useContext(AppContext)
  return (
    <Wrapper>
      <div
        className={
          showSideBar
            ? "sidebar-container show-sidebar"
            : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={toggleSideBar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks  toggleSideBar={toggleSideBar}/>  
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
