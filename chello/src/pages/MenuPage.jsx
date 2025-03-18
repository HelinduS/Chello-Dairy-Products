import styled from "styled-components";
import { Navbar } from "../components/Navbar";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 64px; // Adjust this to match the Landing Page
  color: #E5B94E;
  margin-bottom: 80px;
  text-align: center;
`;

const MenuGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 24px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemName = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: #E5B94E;
  margin-bottom: 16px;
  font-weight: 400;
`;

const PriceInfo = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #E5B94E;
  opacity: 0.8;
  line-height: 1.6;
`;

const MenuPage = () => {
  const menuItems = [
    {
      name: "Birthday\nCakes",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      priceInfo: ["Customized Cakes", "Prices Starting At;", "500g - Rs 2100 /=", "1Kg - Rs 3900 /="],
    },
    {
      name: "Wedding\nCakes",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d",
      priceInfo: ["Customized Cakes", "Prices Starting At;", "500g - Rs 2100 /=", "1Kg - Rs 3900 /="],
    },
    {
      name: "Cupcakes",
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd",
      priceInfo: ["6PCS - Rs 1200 /="],
    },
    {
      name: "Brownies",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      priceInfo: ["10PCS - Rs 2000 /="],
    },
    {
      name: "Cookies",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
      priceInfo: ["Normal Cookies", "6PCS - Rs 1200 /=", "Double ChocolateChip", "Cookies", "6PCS - Rs 1700 /="],
    },
  ];

  return (
    <PageContainer>
      <Navbar />
      <Title>Our Menu</Title>
      <MenuGrid>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <ImageContainer>
              <img src={item.image || "/placeholder.svg"} alt={item.name} />
            </ImageContainer>
            <ItemName>{item.name}</ItemName>
            <PriceInfo>
              {item.priceInfo.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </PriceInfo>
          </MenuItem>
        ))}
      </MenuGrid>
    </PageContainer>
  );
};

export default MenuPage;
