"use client"
import styled from "styled-components"

const StyledButton = styled.button`
  position: relative;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: 56px;
  padding: 0 24px;
  background: ${(props) => (props.outlined ? "transparent" : props.light ? "#FFFFFF" : "#665A38")};
  color: ${(props) => (props.outlined ? (props.light ? "#FFFFFF" : "#665A38") : props.light ? "#000000" : "#FFFFFF")};
  border: ${(props) => (props.outlined ? `2px solid ${props.light ? "#FFFFFF" : "#665A38"}` : "none")};
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    transform: scale(0.98);
  }
`

export const Button = ({ children, fullWidth, light, outlined, onClick }) => {
  return (
    <StyledButton fullWidth={fullWidth} light={light} outlined={outlined} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

