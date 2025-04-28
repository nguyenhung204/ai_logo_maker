"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Mail, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Link href={"/"} className="flex items-center">
                <div className="mr-2 relative w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="AI Logo Maker"
                    width={32}
                    height={32}
                    className="w-6 h-6"
                  />
                </div>
                <span className="text-xl font-bold text-white">AI Logo Maker</span>
              </Link>
            </div>
            <p className="mb-6 text-gray-400">
              Create stunning logos in seconds using the power of artificial intelligence. 
              Perfect for startups, freelancers, and businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-500 flex items-center justify-center transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-500 flex items-center justify-center transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-500 flex items-center justify-center transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-500 flex items-center justify-center transition-colors duration-300"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-pink-500 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="flex items-center text-gray-400 hover:text-pink-400 transition-colors">
                  <ExternalLink size={14} className="mr-2" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/create" className="flex items-center text-gray-400 hover:text-pink-400 transition-colors">
                  <ExternalLink size={14} className="mr-2" />
                  <span>Logo Generator</span>
                </Link>
              </li>
              <li>
                <Link href="/buy-credits" className="flex items-center text-gray-400 hover:text-pink-400 transition-colors">
                  <ExternalLink size={14} className="mr-2" />
                  <span>Buy Credits</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center text-gray-400 hover:text-pink-400 transition-colors">
                  <ExternalLink size={14} className="mr-2" />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-pink-500 pb-2 inline-block">
              Technologies
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-pink-400 transition-colors">ReactJS</li>
              <li className="text-gray-400 hover:text-pink-400 transition-colors">Next.js</li>
              <li className="text-gray-400 hover:text-pink-400 transition-colors">Gemini API</li>
              <li className="text-gray-400 hover:text-pink-400 transition-colors">Hugging face Generator</li>
              <li className="text-gray-400 hover:text-pink-400 transition-colors">Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-pink-500 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@ailogomaker.com" 
                  className="flex items-center text-gray-400 hover:text-pink-400 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  <span>info@ailogomaker.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+84123456789" 
                  className="flex items-center text-gray-400 hover:text-pink-400 transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  <span>+84 123 456 789</span>
                </a>
              </li>
              <li className="pt-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Our Team</h4>
                  <p className="text-gray-400 text-sm mb-1">🧑‍💻 Nguyễn Văn Hùng</p>
                  <p className="text-gray-400 text-sm">🧑‍💻 Huỳnh Đức Phú</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} AI Logo Maker. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-pink-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-pink-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-pink-400 text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}