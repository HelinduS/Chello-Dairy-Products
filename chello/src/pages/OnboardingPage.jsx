import styled from "styled-components"
import { Button } from "../components/Button"
import { PageContainer } from "../components/PageContainer"

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: white;
  padding: 20px;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
`

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  max-width: 600px;
  margin-bottom: 40px;
`

const OnboardingPage = () => {
  return (
    <PageContainer backgroundColor="#000000">
      <OnboardingContainer>
        <Title>Welcome to Sweet Delights</Title>
        <Description>
          Discover the most delicious cakes and pastries for every occasion. Our master bakers create magic with every
          recipe.
        </Description>
        <Button light>Get Started</Button>
      </OnboardingContainer>
    </PageContainer>
  )
}

export default OnboardingPage

