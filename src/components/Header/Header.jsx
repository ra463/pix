import React from "react";
import "./Header.scss";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  return (
    <header>
      <img src="/logo.svg" alt="logo" />
      <AiOutlineMenu />
    </header>
  );
};

export default Header;
