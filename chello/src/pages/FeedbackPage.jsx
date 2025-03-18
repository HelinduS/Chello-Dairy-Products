"use client"

import { useState } from "react"
import styled from "styled-components"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import { Navbar } from "../components/Navbar"
import { PageContainer } from "../components/PageContainer"

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: white;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  border: 2px solid #665A38;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  margin-bottom: 20px;
  background: transparent;
  color: white;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #8a7b4d;
  }
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`

const RatingLabel = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
`

const StarsContainer = styled.div`
  display: flex;
  gap: 10px;
`

const Star = styled.span`
  font-size: 30px;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#FFD700" : "#ccc")};
`

const FeedbackPage = () => {
  const [rating, setRating] = useState(0)

  return (
    <PageContainer backgroundColor="#000000">
      <Navbar />
      <FeedbackContainer>
        <Title>We Value Your Feedback</Title>
        <Description>
          Your feedback helps us improve our products and services. Please take a moment to share your thoughts with us.
        </Description>

        <InputField label="Name" placeholder="Your name" fullWidth light />

        <InputField label="Email" type="email" placeholder="Your email" fullWidth light />

        <RatingContainer>
          <RatingLabel>Rate your experience</RatingLabel>
          <StarsContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} filled={star <= rating} onClick={() => setRating(star)}>
                ★
              </Star>
            ))}
          </StarsContainer>
        </RatingContainer>

        <TextArea placeholder="Share your feedback with us..." />

        <Button light fullWidth>
          Submit Feedback
        </Button>
      </FeedbackContainer>
    </PageContainer>
  )
}

export default FeedbackPage

