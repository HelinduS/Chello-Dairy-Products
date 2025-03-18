"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import loginPic from "../assets/loginpic.jpg"
import UserService  from "../services/UserService.jsx";

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

const SignUpButton = styled.button`
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

  &:disabled {
    background: #CCCCCC;
    cursor: not-allowed;
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

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 14px;
  margin-top: 4px;
  font-family: 'Inter', sans-serif;
`

const SignupPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle signup logic here
      const User = {email: formData.email, password: formData.password};
      UserService.createUser(User).then((response) => {
        const userId = response.data;

        navigate(`/profile-setup?userId=${userId}`);
        console.log(userId);

      });
      console.log("Signup data:", formData)
    }
  }

  return (
    <PageWrapper>
      <ImageSection />
      <FormSection>
        <Header>
          <Title onClick={() => navigate("/login")}>Log In</Title>
          <SignUpButton>Sign Up</SignUpButton>
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
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Create a Password</Label>
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </PasswordToggle>
            </InputWrapper>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Confirm the Password</Label>
            <InputWrapper>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
              <PasswordToggle type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </PasswordToggle>
            </InputWrapper>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </InputGroup>

          <Button type="submit">Next</Button>

          <Footer>
            Already registered? <a onClick={() => navigate("/login")}>Log In</a>
          </Footer>
        </Form>
      </FormSection>
    </PageWrapper>
  )
}

export default SignupPage

