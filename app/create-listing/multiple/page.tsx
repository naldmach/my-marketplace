"use client";
import { useState } from "react";

export default function CreateMultiplePage() {
  const [listings, setListings] = useState("");
  const lines = listings.split("\n").filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left: Form Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Create Multiple Listings</h1>
        <form className="flex flex-col gap-4">
          <textarea
            placeholder="Paste your listings here (one per line)"
            className="border border-border rounded p-2 text-sm"
            rows={6}
            value={listings}
            onChange={(e) => setListings(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full mt-2"
          >
            Create Listings
          </button>
        </form>
      </div>
      {/* Right: Preview Card */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
          <h2 className="font-bold text-lg mb-2">Preview</h2>
          {lines.length === 0 ? (
            <div className="text-gray-500">No listings yet.</div>
          ) : (
            <ul className="space-y-2">
              {lines.map((line, idx) => (
                <li
                  key={idx}
                  className="border border-blue-200 rounded p-3 bg-blue-50"
                >
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
