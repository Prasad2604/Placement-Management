import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const Footer = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <img className="h-12 w-auto" src="/pict-logo.png" alt="PICT Logo" />
          <p className="mt-4 text-sm text-gray-600">
            Pune Institute of Computer Technology
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Survey No. 27, Near Trimurti Chowk, Dhankawadi, Pune, Maharashtra
            411043
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href="/"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
            Contact
          </h3>
          <ul className="mt-4 space-y-4">
            <li className="flex">
              <svg
                className="flex-shrink-0 h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-3 text-base text-gray-500">
                placement@pict.edu
              </span>
            </li>
            <li className="flex">
              <svg
                className="flex-shrink-0 h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="ml-3 text-base text-gray-500">
                +91 020 2437 7329
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-8">
        <p className="text-base text-gray-400 text-center">
          © {new Date().getFullYear()} PICT Placement Cell. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
