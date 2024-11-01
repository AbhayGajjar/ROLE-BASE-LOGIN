"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Optional ShadCN button if needed
import { cn } from "@/lib/utils"; // Utility class if used in your project

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="max-w-7xl mx-auto container p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold">
          Logo
        </a>

        {/* Hamburger Icon (visible on small screens) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isOpen ? "✖️" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/form">Add User</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden">
          <li>
            <Link href="/home" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/form" onClick={() => setIsOpen(false)}>
              Add User
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
