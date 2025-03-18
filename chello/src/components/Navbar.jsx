"use client"

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/glazelogo.jpg";

// Navbar Styles
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8); /* Ensure visibility on all backgrounds */

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #F5E6CC;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #E5B94E;
  }
`;

const LoginButton = styled.button`
  background: #665A38;
  border: none;
  border-radius: 12px;
  padding: 12px 32px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 30px;

  &:hover {
    background: #7d6c43;
    transform: translateY(-2px);
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <Logo onClick={() => navigate("/")}>
        <img src={logo} alt="The Glaze Logo" />
      </Logo>
      <NavLinks>
        <NavLink onClick={() => navigate("/")}>Home</NavLink>
        <NavLink onClick={() => navigate("/menu")}>Menu</NavLink>
        <NavLink onClick={() => navigate("/about")}>About Us</NavLink>
        <NavLink onClick={() => navigate("/feedback")}>Feedbacks</NavLink>
        <NavLink onClick={() => navigate("/contact")}>Contact Us</NavLink>
      </NavLinks>
      <LoginButton onClick={() => navigate("/login")}>Log In</LoginButton>
    </NavContainer>
  );
};
