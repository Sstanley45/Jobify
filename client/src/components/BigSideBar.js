import Wrapper from "../assets/wrappers/BigSidebar";
import { AppContext } from "../contexts/appContext";
import Logo from "./Logo";
import { useContext } from "react";
import NavLinks from "./NavLinks";




const BigSidebar = () => {
  const {showSideBar} = useContext(AppContext)
  return (
    <Wrapper>
      <div className={showSideBar ? "sidebar-container show-sidebar" : 'sidebar-container'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar; 
