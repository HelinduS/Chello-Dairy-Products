import React from "react"
import ReactDOM from "react-dom/client"
import { createGlobalStyle } from "styled-components"
import App from "./App"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)

