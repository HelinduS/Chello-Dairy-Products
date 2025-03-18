import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import AboutPage from "./pages/AboutPage"
import FeedbackPage from "./pages/FeedbackPage"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import MenuPage from "./pages/MenuPage"
import OnboardingPage from "./pages/OnboardingPage"
import ProfileSetupPage from "./pages/ProfileSetupPage"
import SignupPage from "./pages/SignupPage"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  )
}

export default App

