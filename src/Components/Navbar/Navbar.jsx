import React, { useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  const removeActive = () => {
    setIsActive(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          {/* logo */}
          <a href="#home" className={`${styles.logo}`}>
            AiVsHuman
          </a>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <div onClick={removeActive}>
              <a href="#home" className={`${styles.navLink}`}>
                Home
              </a>
            </div>
            <div onClick={removeActive}>
              <a href="#home" className={`${styles.navLink}`}>
                AboutUs
              </a>
            </div>
            <div onClick={removeActive}>
              <a href="#home" className={`${styles.navLink}`}>
                Collaborations
              </a>
            </div>
            <div onClick={removeActive}>
              <a href="#home" className={`${styles.navLink}`}>
                Contact
              </a>
            </div>
          </ul>
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
