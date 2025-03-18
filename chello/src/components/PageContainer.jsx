import styled from "styled-components"

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 832px;
  background: ${(props) => props.backgroundColor || "#FFFFFF"};
  overflow-y: auto;
`

export const PageContainer = ({ children, backgroundColor }) => {
  return <Container backgroundColor={backgroundColor}>{children}</Container>
}

