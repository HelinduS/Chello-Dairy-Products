import styled from "styled-components"

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Content = styled.div`
  padding: 16px;
`

const Name = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`

const Price = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #ccc;
`

const AddButton = styled.button`
  width: 100%;
  padding: 8px 0;
  margin-top: 12px;
  background-color: #665A38;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #7d6c43;
  }
`

export const MenuItem = ({ name, price, image }) => {
  return (
    <Card>
      <ImageContainer>
        <Image src={image || "/placeholder.svg"} alt={name} />
      </ImageContainer>
      <Content>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <AddButton>Add to Cart</AddButton>
      </Content>
    </Card>
  )
}

