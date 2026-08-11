import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CalculatorProvider } from './context/CalculatorContext';

import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { AIChatWidget } from './components/ai/AIChatWidget';

import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { AllCalculators } from './pages/AllCalculators';
import { CategoriesPage } from './pages/CategoriesPage';
import { CalculatorDetailPage } from './pages/CalculatorDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HistoryPage } from './pages/HistoryPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminRoute } from './components/common/AdminRoute';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CalculatorProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0B0F17] text-gray-900 dark:text-gray-100 transition-colors">
              <Navbar />

              <div className="flex-1 max-w-7xl w-full mx-auto flex">
                <Sidebar />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calculators" element={<AllCalculators />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/calculator/:slug" element={<CalculatorDetailPage />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Publicly Accessible Tool & User Suite Routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/history" element={<HistoryPage />} />

                    {/* Account Settings & Admin Routes */}
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

                    {/* Admin Only Route */}
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  </Routes>
                </main>
              </div>

              <Footer />
              <AIChatWidget />
            </div>
          </Router>
        </CalculatorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
