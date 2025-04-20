import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import pictLogo from '../assets/pict-logo.png';

const SignIn1 = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-brand-blue via-brand-purple to-brand-pink">
        <div className="absolute inset-0 bg-gradient-radial from-black/20 to-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <img src='/img/PICT_logo_1.png' alt="PICT Logo" className="w-32 h-32 mb-8" />
          <h1 className="text-4xl font-display font-bold mb-4">PICT Placements</h1>
          <p className="text-xl font-display text-center max-w-md">
            One stop portal for students & companies for placements
          </p>
          <div className="mt-12 space-y-4 text-center">
            <p className="text-lg font-semibold">Trusted by leading companies</p>
            <div className="flex justify-center space-x-8">
              {/* Add company logos here */}
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />
      </div>

      {/* Right Section - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Sign in to PICT Placement Portal
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-primary-700">Student</div>
                <div className="text-sm text-gray-600">Sign in as a student</div>
              </div>
              <input
                type="radio"
                name="userType"
                value="student"
                defaultChecked
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="roll" className="block text-sm font-medium text-gray-700">
                  Roll Number
                </label>
                <input
                  id="roll"
                  name="roll"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your roll number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign in
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-gray-500">Don't have an account?</span>
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn1; 