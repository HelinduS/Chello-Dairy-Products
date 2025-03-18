import styled from "styled-components"
import loginPic from "../assets/loginpic.jpg"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import UserService from "../services/UserService.jsx"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

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

const ProfileSetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.5px;
  color: #665A38;
  margin-bottom: 30px;
`

const FormRow = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`

const FieldContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userAccountId = Number(searchParams.get("userId")) || 0;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fixed handleChange function to properly update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };


  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const customerProfile = {
          userAccountId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          address: formData.addressLine2
              ? `${formData.addressLine1}, ${formData.addressLine2}`
              : formData.addressLine1,
          city: formData.city,
          state: formData.state,
        };

        await UserService.createCustomerProfile(customerProfile);
        navigate("/login");
      } catch (error) {
        console.error("Failed to create profile:", error);
        // Handle API errors here
      }
    }
  };

  return (
      <PageWrapper>
        <ImageSection />
        <FormSection>
          <ProfileSetupContainer>
            <Title>Set Up Your Profile</Title>

            <form onSubmit={handleProfileSubmit} style={{ width: "100%" }}>
              <FormRow>
                <FieldContainer>
                  <InputField
                      name="firstName"
                      label="First Name"
                      placeholder="Pawan"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                  {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
                </FieldContainer>

                <FieldContainer>
                  <InputField
                      name="lastName"
                      label="Last Name"
                      placeholder="Kumarage"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                  {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                </FieldContainer>
              </FormRow>

              <FieldContainer>
                <InputField
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="+94 71 345 6789"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
              </FieldContainer>

              <FieldContainer>
                <InputField
                    name="addressLine1"
                    label="Address Line 1"
                    placeholder="Aniwatta Road"
                    value={formData.addressLine1}
                    onChange={handleChange}
                />
                {errors.addressLine1 && <ErrorText>{errors.addressLine1}</ErrorText>}
              </FieldContainer>

              <FieldContainer>
                <InputField
                    name="addressLine2"
                    label="Address Line 2"
                    placeholder="Primrose Gardens"
                    value={formData.addressLine2}
                    onChange={handleChange}
                />
              </FieldContainer>

              <FieldContainer>
                <InputField
                    name="city"
                    label="City"
                    placeholder="Kandy"
                    value={formData.city}
                    onChange={handleChange}
                />
                {errors.city && <ErrorText>{errors.city}</ErrorText>}
              </FieldContainer>

              <FieldContainer>
                <InputField
                    name="state"
                    label="State"
                    placeholder="Central"
                    value={formData.state}
                    onChange={handleChange}
                />
                {errors.state && <ErrorText>{errors.state}</ErrorText>}
              </FieldContainer>

              <Button type="submit">Save</Button>
            </form>
          </ProfileSetupContainer>
        </FormSection>
      </PageWrapper>
  );
};

export default ProfileSetupPage;