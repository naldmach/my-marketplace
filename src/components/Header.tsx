"use client";
import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-16 px-8 border-b border-border bg-background">
      {/* Logo and app name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          F
        </div>
        <span className="font-bold text-lg">Marketplace</span>
      </div>
      {/* Icons */}
      <div className="flex items-center gap-6">
        <Link href="/messages" aria-label="Messages">
          <button className="text-2xl" type="button">
            ✉️
          </button>
        </Link>
        <Link href="/notifications" aria-label="Notifications">
          <button className="text-2xl" type="button">
            🔔
          </button>
        </Link>
        <Link href="/profile" aria-label="Profile">
          <button className="text-2xl" type="button">
            👤
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
