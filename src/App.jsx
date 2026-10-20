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
import AdminGuard from './admin/AdminGuard'
import AdminLayout from './admin/AdminLayout'
import AdminLoginPage from './admin/pages/AdminLoginPage'
import AdminDashboardPage from './admin/pages/AdminDashboardPage'
import AdminServicesPage from './admin/pages/AdminServicesPage'
import AdminTestimonialsPage from './admin/pages/AdminTestimonialsPage'
import AdminBookingsPage from './admin/pages/AdminBookingsPage'

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
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="testimonials" element={<AdminTestimonialsPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
          </Route>
        </Route>
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
