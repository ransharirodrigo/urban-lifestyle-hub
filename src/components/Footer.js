"use client";

import React from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Dock from "./Dock";

const Footer = () => {
  const socialItems = [
    {
      icon: <Instagram className="w-5 h-5 text-gray-700" />,
      label: "Instagram",
      onClick: () => window.open("https://instagram.com", "_blank")
    },
    {
      icon: <Linkedin className="w-5 h-5 text-gray-700" />,
      label: "LinkedIn",
      onClick: () => window.open("https://linkedin.com", "_blank")
    },
    {
      icon: <Twitter className="w-5 h-5 text-gray-700" />,
      label: "Twitter",
      onClick: () => window.open("https://twitter.com", "_blank")
    }
  ];

  return (
    <footer className="relative w-full bg-white border-t border-gray-200 py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Copyright */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-sm">
            © 2026 Urban Hub. All rights reserved.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="text-center mb-8">
          <p className="text-gray-700 font-medium mb-4">Follow Us:</p>
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="text-gray-600 hover:text-[#ff5800] transition-colors duration-200"
            >
              Instagram
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => window.open("https://linkedin.com", "_blank")}
              className="text-gray-600 hover:text-[#ff5800] transition-colors duration-200"
            >
              LinkedIn
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => window.open("https://twitter.com", "_blank")}
              className="text-gray-600 hover:text-[#ff5800] transition-colors duration-200"
            >
              Twitter
            </button>
          </div>
        </div>

        {/* Dock Component */}
        <div className="relative h-24 mb-4">
          <Dock 
            items={socialItems} 
            magnification={60}
            distance={150}
            panelHeight={50}
            dockHeight={180}
            baseItemSize={40}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
