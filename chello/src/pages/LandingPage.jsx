"use client"

import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import landing from "../assets/landing3.jpg";
import { Navbar } from "../components/Navbar";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 120px 80px;
  position: relative;

  @media (max-width: 768px) {
    padding: 100px 20px;
    flex-direction: column;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-family: 'Aladin', serif;
  font-size: 72px;
  color: #F5E6CC;
  margin-bottom: 16px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Josefin Sans', serif;
  font-size: 48px;
  color: #F5E6CC;
  margin-bottom: 24px;
  max-width: 600px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  color: #C4B8A3;
  margin-bottom: 48px;
  max-width: 700px;
  line-height: 1.6;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${(props) => (props.variant === "primary" ? "#665A38" : "transparent")};
  border: ${(props) => (props.variant === "primary" ? "none" : "2px solid #665A38")};
  border-radius: 8px;
  padding: 16px 32px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.variant === "primary" ? "#7d6c43" : "rgba(102, 90, 56, 0.2)")};
    transform: translateY(-2px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateY(2px);
  }
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;

  img {
    max-width: 80%;
    height: auto;
    object-fit: contain;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    filter: brightness(50%);
  }

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Navbar />
      <HeroSection>
        <ContentSection>
          <Title>THE GLAZE</Title>
          <Subtitle>A Symphony of Flavours & Elegance</Subtitle>
          <Description>
            "Artisanal cakes, handcrafted to perfection. Elevate your celebrations with our exquisite flavours and stunning designs."
          </Description>
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate("/menu")}>
              Explore Our Creations
              <ChevronDown size={20} />
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </ButtonGroup>
        </ContentSection>
        <ImageSection>
          <img
            src={landing}
            alt="Elegant cupcake with smoke"
          />
        </ImageSection>
      </HeroSection>
    </PageContainer>
  );
};

export default LandingPage;
