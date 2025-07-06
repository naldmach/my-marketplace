"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

const Header: React.FC = () => {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="flex items-center justify-between h-16 px-8 border-b border-border bg-background">
      {/* Logo and app name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          F
        </div>
        <span className="font-bold text-lg">Marketplace</span>
      </div>
      {/* Icons and User Menu */}
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
        {/* User Menu */}
        {!loading && user ? (
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-medium text-gray-700"
              title={user.email}
            >
              {user.email}
            </span>
            <Link
              href="/your-listings"
              className="text-blue-600 hover:underline text-sm font-semibold"
            >
              Your Listings
            </Link>
            <button
              onClick={signOut}
              className="ml-2 text-sm bg-gray-200 hover:bg-gray-300 rounded px-3 py-1 font-semibold"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Demo Mode - Seller Account
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
