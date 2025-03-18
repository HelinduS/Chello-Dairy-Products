"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import loginPic from "../assets/loginpic.jpg"
import AuthService from "../services/AuthService.jsx";

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #FFFFFF;
`

const ImageSection = styled.div`
  flex: 1;
  background-image: url(${loginPic});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(100%); /* Makes the image black and white */
  
  @media (max-width: 768px) {
    display: none;
  }
`

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 24px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`

const Title = styled.h1`
font-family: 'Inter', sans-serif;
font-size: 16px;
color: #ffffff;
background: #665A38;
border: 2px solid #665A38;
border-radius: 12px;
padding: 10px 24px;
cursor: pointer;
transition: all 0.3s ease;

&:hover {
  background: rgba(102, 90, 56, 0.1);
}
`

const SignUpLink = styled.a`
font-family: 'Inter', sans-serif;
font-size: 16px;
color: #665A38;
font-weight: normal;
border: 2px solid #665A38;
border-radius: 12px;
padding: 10px 24px;
cursor: pointer;
transition: all 0.3s ease;

&:hover {
  background: rgba(10, 90, 58, 0.1);
}
`

const Form = styled.form`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`

const InputGroup = styled.div`
  margin-bottom: 24px;
`

const Label = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2A2A2A;
  margin-bottom: 8px;
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 2px solid #665A38;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2A2A2A;

  &:focus {
    outline: none;
    border-color: #8a7b4d;
  }

  &::placeholder {
    color: #8C8C8C;
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #665A38;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #665A38;
  text-decoration: none;
  margin-top: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Button = styled.button`
  width: 100%;
  height: 56px;
  background: #665A38;
  border: none;
  border-radius: 12px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #7d6c43;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #8C8C8C;
  font-family: 'Inter', sans-serif;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E5E5E5;
    margin: 0 16px;
  }
`

const SocialButton = styled.button`
  width: 100%;
  height: 56px;
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2A2A2A;
  cursor: pointer;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #F5F5F5;
    border-color: #D5D5D5;
  }

  img {
    width: 24px;
    height: 24px;
  }
`

const Footer = styled.div`
  text-align: center;
  margin-top: 24px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #8C8C8C;

  a {
    color: #665A38;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const LoginPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    const User = {email: formData.email, password: formData.password}
    console.log("Login data:", formData)
    navigate("/") // Navigate to home page after login
  }

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log("Google login")
  }

  const handleFacebookLogin = () => {
    // Handle Facebook login
    console.log("Facebook login")
  }

  return (
    <PageWrapper>
      <ImageSection />
      <FormSection>
        <Header>
          <Title>Log In</Title>
          <SignUpLink onClick={() => navigate("/signup")}>Sign Up</SignUpLink>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Your Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </PasswordToggle>
            </InputWrapper>
            <ForgotPassword onClick={() => navigate("/forgot-password")}>Forgot password?</ForgotPassword>
          </InputGroup>

          <Button type="submit">Continue</Button>

          <Divider>Or</Divider>

          <SocialButton type="button" onClick={handleGoogleLogin}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjgwNTUgMTAuMDQxNUgyMVYxMEgxMlYxNEgxNy42NTE1QzE2LjgyNyAxNi4zMjg1IDE0LjYxMTUgMTggMTIgMThDOC42ODY1IDE4IDYgMTUuMzEzNSA2IDEyQzYgOC42ODY1IDguNjg2NSA2IDEyIDZDMTMuNTI5NSA2IDE0LjkyMSA2LjU3NyAxNS45ODA1IDcuNTE5NUwxOC44MDkgNC42OTFDMTcuMDIzIDMuMDI2NSAxNC42MzQgMiAxMiAyQzYuNDc3NSAyIDIgNi40Nzc1IDIgMTJDMiAxNy41MjI1IDYuNDc3NSAyMiAxMiAyMkMxNy41MjI1IDIyIDIyIDE3LjUyMjUgMjIgMTJDMjIgMTEuMzI5NSAyMS45MzEgMTAuNjc1IDIxLjgwNTUgMTAuMDQxNVoiIGZpbGw9IiNGRkMxMDciLz4KPHBhdGggZD0iTTMuMTUzMDIgNy4zNDU1TDYuNDM4NTIgOS43NTVDNy4zMjc1MiA3LjU1NCA5LjQ4MDUyIDYgMTIgNkMxMy41Mjk1IDYgMTQuOTIxIDYuNTc3IDE1Ljk4MDUgNy41MTk1TDE4LjgwOSA0LjY5MUMxNy4wMjMgMy4wMjY1IDE0LjYzNCAyIDEyIDJDOC4xNTkwMiAyIDQuODI4MDIgNC4xNjg1IDMuMTUzMDIgNy4zNDU1WiIgZmlsbD0iI0ZGM0QwMCIvPgo8cGF0aCBkPSJNMTIgMjJDMTQuNTgzIDIyIDE2LjkzIDIxLjAxMTUgMTguNzA0NSAxOS40MDRMMTUuNjA5NSAxNi43ODVDMTQuNTcxNyAxNy41NzQyIDEzLjMwMzcgMTguMDAxMSAxMiAxOEM5LjM5ODk3IDE4IDcuMTkwNDcgMTYuMzQxNSA2LjM1ODQ3IDE0LjAyN0wzLjA5NzQ3IDE2LjUzOTVDNC43NTI0NyAxOS43NzggOC4xMTM0NyAyMiAxMiAyMloiIGZpbGw9IiM0Q0FGNTAiLz4KPHBhdGggZD0iTTIxLjgwNTUgMTAuMDQxNUgyMVYxMEgxMlYxNEgxNy42NTE1QzE3LjI1NzEgMTUuMTA4MiAxNi41NDY3IDE2LjA3NjYgMTUuNjA4IDE2Ljc4NTVMMTUuNjA5NSAxNi43ODVMMTguNzA0NSAxOS40MDRDMTguNDg1NSAxOS42MDI1IDIyIDE3IDIyIDEyQzIyIDExLjMyOTUgMjEuOTMxIDEwLjY3NSAyMS44MDU1IDEwLjA0MTVaIiBmaWxsPSIjMTk3NkQyIi8+Cjwvc3ZnPgo="
              alt="Google"
            />
            Login with Google
          </SocialButton>

          <SocialButton type="button" onClick={handleFacebookLogin}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDEyQzI0IDUuMzcyNTggMTguNjI3NCAwIDEyIDBDNS4zNzI1OCAwIDAgNS4zNzI1OCAwIDEyQzAgMTcuOTg5NSA0LjM4ODIgMjIuOTU0IDEwLjEyNSAyMy44NTQyVjE1LjQ2ODhINy4wNzgxMlYxMkgxMC4xMjVWOS4zNTYyNUMxMC4xMjUgNi4zNDg3NSAxMS45MTY2IDQuNjg3NSAxNC42NTc2IDQuNjg3NUMxNS45NzAxIDQuNjg3NSAxNy4zNDM4IDQuOTIxODggMTcuMzQzOCA0LjkyMTg4VjcuODc1SDE1LjgzMDZDMTQuMzQgNy44NzUgMTMuODc1IDguODAwMDggMTMuODc1IDkuNzVWMTJIMTcuMjAzMUwxNi42NzExIDE1LjQ2ODhIMTMuODc1VjIzLjg1NDJDMTkuNjExOCAyMi45NTQgMjQgMTcuOTg5NSAyNCAxMloiIGZpbGw9IiMxODc3RjIiLz4KPHBhdGggZD0iTTE2LjY3MTEgMTUuNDY4OEwxNy4yMDMxIDEySDE0VjkuNzVDMTQgOC44MDEwMiAxNC40NjUgNy44NzUgMTUuOTU1NiA3Ljg3NUgxNy40Njg4VjQuOTIxODhDMTcuNDY4OCA0LjkyMTg4IDE2LjA5NTEgNC42ODc1IDE0Ljc4MjYgNC42ODc1QzEyLjA0MTYgNC42ODc1IDEwLjI1IDYuMzQ4NzUgMTAuMjUgOS4zNTYyNVYxMkg3LjIwMzEyVjE1LjQ2ODhIMTAuMjVWMjMuODU0MkMxMS40OTI0IDI0LjA0ODYgMTIuNzU3NiAyNC4wNDg2IDE0IDIzLjg1NDJWMTUuNDY4OEgxNi42NzExWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
              alt="Facebook"
            />
            Login with Facebook
          </SocialButton>

          <Footer>
            Don't have an account? <a onClick={() => navigate("/signup")}>Sign Up</a>
          </Footer>
        </Form>
      </FormSection>
    </PageWrapper>
  )
}

export default LoginPage

