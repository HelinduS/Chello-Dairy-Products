"use client"
import styled from "styled-components"

const InputContainer = styled.div`
  width: ${(props) => (props.fullWidth ? "100%" : "100%")};
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: ${(props) => (props.light ? "#FFFFFF" : "#2A2A2A")};
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background: transparent;
  border: 2px solid #665A38;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: ${(props) => (props.light ? "#FFFFFF" : "#545454")};
  
  &:focus {
    outline: none;
    border-color: #8a7b4d;
  }
  
  &::placeholder {
    color: ${(props) => (props.light ? "rgba(255, 255, 255, 0.6)" : "#545454")};
  }
`

export const InputField = ({ label, type = "text", placeholder, fullWidth, light, value, onChange, name }) => {
    return (
        <InputContainer fullWidth={fullWidth}>
            {label && <Label light={light}>{label}</Label>}
            <Input
                type={type}
                placeholder={placeholder}
                light={light}
                value={value}
                onChange={onChange}
                name={name} // Add this line
            />
        </InputContainer>
    )
}


