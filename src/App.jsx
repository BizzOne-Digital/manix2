import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SiteGate, { hasEnteredSite } from './components/SiteGate'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ServicesPage from './pages/ServicesPage'
import TestimonialsPage from './pages/TestimonialsPage'
import WelcomePage from './pages/WelcomePage'

function WelcomeOrRedirect() {
  if (hasEnteredSite()) {
    return <Navigate to="/" replace />
  }
  return <WelcomePage />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<WelcomeOrRedirect />} />
        <Route element={<SiteGate />}>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
