import { supabase } from "@/lib/supabaseClient";
import MarketplaceGrid from "../components/MarketplaceGrid";
import Link from "next/link";
import { Search, TrendingUp, Star } from "lucide-react";

export default async function Home() {
  // Fetch featured listings (most recent or highest rated)
  const { data: featuredListings } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  const categories = [
    { name: "Electronics", icon: "📱", href: "/category/electronics" },
    { name: "Fashion", icon: "👕", href: "/category/fashion" },
    { name: "Home & Garden", icon: "🏠", href: "/category/home" },
    { name: "Sports", icon: "⚽", href: "/category/sports" },
    { name: "Vehicles", icon: "🚗", href: "/category/vehicles" },
    { name: "Books", icon: "📚", href: "/category/books" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Amazing Deals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover unique items from local sellers in your community
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create-listing"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sell Your Item
              </Link>
              <Link
                href="/category/all"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold text-gray-900">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
          </div>
          <Link
            href="/category/all"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            View All
            <TrendingUp className="w-4 h-4" />
          </Link>
        </div>

        {featuredListings && featuredListings.length > 0 ? (
          <MarketplaceGrid />
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No listings yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list an item in your community!
            </p>
            <Link
              href="/create-listing"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Your First Listing
            </Link>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {featuredListings?.length || 0}+
              </div>
              <div className="text-gray-600">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Secure Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
