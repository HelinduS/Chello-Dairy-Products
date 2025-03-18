import styled from "styled-components"
import { Navbar } from "../components/Navbar"
import { PageContainer } from "../components/PageContainer"

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: white;
  max-width: 1000px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`

const Section = styled.div`
  margin-bottom: 40px;
`

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`

const Paragraph = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 16px;
`

const AboutPage = () => {
  return (
    <PageContainer backgroundColor="#000000">
      <Navbar />
      <AboutContainer>
        <Title>About Sweet Delights</Title>

        <Section>
          <SectionTitle>Our Story</SectionTitle>
          <Paragraph>
            Sweet Delights was founded in 2010 with a simple mission: to create delicious, handcrafted cakes that bring
            joy to every celebration. What started as a small home bakery has grown into a beloved local institution,
            known for quality and creativity.
          </Paragraph>
          <Paragraph>
            Our founder, Maria Johnson, learned the art of baking from her grandmother and has passed down those
            traditional techniques to our team of skilled bakers.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Our Philosophy</SectionTitle>
          <Paragraph>
            We believe that every cake should be as unique as the occasion it celebrates. That's why we work closely
            with our customers to create custom designs that reflect their vision and exceed their expectations.
          </Paragraph>
          <Paragraph>
            We use only the finest ingredients, sourced locally whenever possible, to ensure that our cakes taste as
            good as they look.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Our Team</SectionTitle>
          <Paragraph>
            Our team of passionate bakers and decorators bring years of experience and creativity to every project. From
            classic designs to elaborate custom creations, we take pride in our craftsmanship and attention to detail.
          </Paragraph>
        </Section>
      </AboutContainer>
    </PageContainer>
  )
}

export default AboutPage

