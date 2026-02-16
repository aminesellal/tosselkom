import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { HowItWorks } from './components/HowItWorks'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

// Auth Pages
import { AuthChoice } from './pages/AuthChoice'
import { RegisterChoice } from './pages/RegisterChoice'
import { RegisterCourier } from './pages/RegisterCourier'
import { RegisterSender } from './pages/RegisterSender'
import { LoginCourier } from './pages/LoginCourier'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'

// Courier Dashboard Pages
import { CourierDashboard } from './pages/courier/CourierDashboard'
import { CourierOffers } from './pages/courier/CourierOffers'
import { CourierDeliveries } from './pages/courier/CourierDeliveries'
import { CourierHistory } from './pages/courier/CourierHistory'
import { CourierProfile } from './pages/courier/CourierProfile'

// Sender Dashboard Pages
import { SenderDashboard } from './pages/sender/SenderDashboard'
import { SenderNewOrder } from './pages/sender/SenderNewOrder'
import { SenderOrders } from './pages/sender/SenderOrders'
import { SenderProfile } from './pages/sender/SenderProfile'

function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Stats />
            <HowItWorks />
            <CTA />
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthChoice />} />
                    <Route path="/login" element={<AuthChoice />} />
                    <Route path="/register" element={<RegisterChoice />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/login/courier" element={<LoginCourier />} />
                    <Route path="/register/courier" element={<RegisterCourier />} />
                    <Route path="/register/sender" element={<RegisterSender />} />

                    {/* Courier Routes */}
                    <Route path="/courier/dashboard" element={<CourierDashboard />} />
                    <Route path="/courier/offers" element={<CourierOffers />} />
                    <Route path="/courier/deliveries" element={<CourierDeliveries />} />
                    <Route path="/courier/history" element={<CourierHistory />} />
                    <Route path="/courier/profile" element={<CourierProfile />} />

                    {/* Sender Routes */}
                    <Route path="/sender/dashboard" element={<SenderDashboard />} />
                    <Route path="/sender/new-order" element={<SenderNewOrder />} />
                    <Route path="/sender/orders" element={<SenderOrders />} />
                    <Route path="/sender/profile" element={<SenderProfile />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
