"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Shop", href: "/shop" },
    { name: "Order Status", href: "/order-status" },
  ];

  const infoLinks = [
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-[#fffaf3]/80 backdrop-blur-xl shadow-sm h-14"
            : "bg-[#fffaf3]/95 backdrop-blur-md h-16"
        }
        border-b border-[#e6dcd0]
      `}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-full">
        {/* ⭐ Premium Grid */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full">
          {/* LEFT — LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#4a2c14] rounded-md flex items-center justify-center">
              <span className="text-[#f5efe6] font-serif text-lg">W</span>
            </div>

            <span className="font-serif text-xl tracking-wide text-[#3b2412]">
              Wood<span className="text-[#9b7b65]">Maps</span>
            </span>
          </Link>

          {/* CENTER — NAV */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  relative text-sm font-medium
                  text-[#5a3726]
                  hover:text-[#2b1a12]
                  transition
                  after:absolute after:-bottom-1 after:left-0
                  after:h-[2px] after:w-0
                  after:bg-[#9b7b65]
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item.name}
              </Link>
            ))}

            {/*DROPDOWN */}
            <div className="relative group">
              <button
                className="
                  flex items-center gap-1 text-sm font-medium
                  text-[#5a3726]
                  hover:text-[#2b1a12]
                  transition
                "
              >
                Information
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* Dropdown */}
              <div
                className="
                  absolute left-1/2 -translate-x-1/2 top-full mt-5 w-60
                  rounded-2xl
                  bg-[#fffaf3]/95
                  backdrop-blur-md
                  border border-[#e6dcd0]
                  shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                  p-3
                  opacity-0 invisible translate-y-4
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-300 ease-out
                "
              >
                {infoLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="
                      flex items-center justify-between
                      rounded-xl px-4 py-2.5 text-sm
                      text-[#3b2412]
                      hover:bg-[#f3ebe2]
                      transition
                    "
                  >
                    {item.name}
                    <span className="opacity-0 group-hover:opacity-100 transition">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-end items-center gap-5">
            <Link
              href="/login"
              className="
                hidden sm:flex items-center gap-2 text-sm font-medium
                text-[#5a3726]
                hover:text-[#2b1a12]
                transition
              "
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>

            <Link href="/cart" className="relative text-[#3b2412]">
              <ShoppingCart className="h-5 w-5" />
              <span
                className="
                absolute -top-2 -right-2
                h-4 w-4 rounded-full
                bg-[#9b7b65]
                text-white
                text-xs flex items-center justify-center
              "
              >
                0
              </span>
            </Link>

            {/* MOBILE BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#3b2412]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#e6dcd0]">
            <div className="flex flex-col gap-4">
              {[...navigation, ...infoLinks].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#5a3726]"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[#5a3726]"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
