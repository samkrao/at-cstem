import React, { useState } from 'react';
import { Menu, X, Code, Users, Mail, LogIn, UserPlus, Home, CheckCircle } from 'lucide-react';

export default function ATCStemWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    // TODO: Connect to your Quarkus backend API
    // Example: POST to https://at-cstem.com/api/auth/login
    setSubmitStatus({ type: 'success', message: 'Login functionality will connect to your Quarkus backend' });
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleRegister = () => {
    // TODO: Connect to your Quarkus backend API
    // Example: POST to https://at-cstem.com/api/auth/register
    setSubmitStatus({ type: 'success', message: 'Registration will connect to your Quarkus backend' });
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleContact = () => {
    // TODO: Connect to your Quarkus backend API
    // Example: POST to https://at-cstem.com/api/contact
    setSubmitStatus({ type: 'success', message: 'Message sent! We will get back to you soon.' });
    setFormData({ ...formData, name: '', email: '', message: '' });
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const NavBar = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Code className="h-8 w-8" />
            <span className="text-2xl font-bold">AT-CSTEM</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-200 transition flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-blue-200 transition flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>About Us</span>
            </button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-blue-200 transition flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </button>
            <button onClick={() => setCurrentPage('login')} className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center space-x-1">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </button>
            <button onClick={() => setCurrentPage('register')} className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition flex items-center space-x-1">
              <UserPlus className="h-4 w-4" />
              <span>Register</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-2 rounded">Home</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-2 rounded">About Us</button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-2 rounded">Contact</button>
            <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-2 rounded">Login</button>
            <button onClick={() => { setCurrentPage('register'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-2 rounded">Register</button>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AT-CSTEM</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Empowering the future through Computer Science, Technology, Engineering, and Mathematics education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentPage('register')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
              Get Started
            </button>
            <button onClick={() => setCurrentPage('about')} className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition border-2 border-gray-200">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Code className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Innovation</h3>
            <p className="text-gray-600">Cutting-edge technology and innovative solutions for modern education</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Community</h3>
            <p className="text-gray-600">Join a thriving community of learners and educators</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Excellence</h3>
            <p className="text-gray-600">Committed to delivering excellence in STEM education</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">About AT-CSTEM</h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            AT-CSTEM is dedicated to advancing Computer Science, Technology, Engineering, and Mathematics education. We believe in making quality STEM education accessible to everyone, fostering innovation, and preparing the next generation of technology leaders.
          </p>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">What We Do</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            We provide comprehensive learning resources, interactive platforms, and community-driven programs that empower students, educators, and professionals to excel in the rapidly evolving world of technology and science.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Our Values</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Innovation First</h3>
                <p className="text-gray-700">Constantly pushing boundaries and embracing new technologies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Inclusive Learning</h3>
                <p className="text-gray-700">Making STEM education accessible to learners of all backgrounds</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Community Driven</h3>
                <p className="text-gray-700">Building a supportive network of learners and mentors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">We'd love to hear from you!</p>
        
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              onClick={handleContact}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
            >
              Send Message
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p className="mb-2">Email: info@at-cstem.com</p>
            <p>We typically respond within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">Login</h1>
        
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <button className="text-blue-600 hover:underline">Forgot password?</button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
            >
              Login
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600">
            Don't have an account? 
            <button onClick={() => setCurrentPage('register')} className="text-blue-600 hover:underline ml-1 font-semibold">
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">Register</h1>
        
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-2" />
              <label className="text-sm text-gray-600">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
            >
              Create Account
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600">
            Already have an account? 
            <button onClick={() => setCurrentPage('login')} className="text-purple-600 hover:underline ml-1 font-semibold">
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegisterPage />}

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 AT-CSTEM. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Empowering the future through STEM education</p>
        </div>
      </footer>
    </div>
  );
}