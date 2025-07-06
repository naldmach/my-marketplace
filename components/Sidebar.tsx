"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Choose listing type", href: "/create-listing" },
  { label: "Your listings", href: "/your-listings" },
  { label: "Seller help", href: "/seller-help" },
];

const categories = [
  "Vehicles",
  "Property Rentals",
  "Apparel",
  "Classifieds",
  "Electronics",
  "Entertainment",
  "Family",
  "Free Stuff",
  "Garden & Outdoor",
  "Hobbies",
  "Home Goods",
  "Home Improvement",
  "Home Sales",
  "Musical Instruments",
  "Office Supplies",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Games",
  "Buy and sell groups",
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const categoryMatch = pathname.match(/^\/category\/(.+)$/);
  const activeCategory = categoryMatch
    ? decodeURIComponent(categoryMatch[1]).replace(/-/g, " ")
    : null;

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col py-6 px-4 min-h-screen">
      {/* Logo and app name */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          F
        </div>
        <span className="font-bold text-lg">Marketplace</span>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-1 mb-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium ${
              pathname === link.href ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {/* Categories */}
      <div>
        <div className="font-bold mb-2 text-sm text-gray-700">Categories</div>
        <ul className="text-sm space-y-1">
          {categories.map((cat) => {
            const catSlug = cat.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeCategory === cat;
            return (
              <li key={cat}>
                <Link
                  href={`/category/${catSlug}`}
                  className={`block px-2 py-1 rounded ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
