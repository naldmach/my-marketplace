"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateItemPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const { error } = await supabase.from("listings").insert([
      {
        title,
        price,
        seller_email: email,
        description,
        category: "item", // or whatever category logic you want
      },
    ]);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Listing created!");
      setTitle("");
      setPrice("");
      setEmail("");
      setDescription("");
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left: Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm"
      >
        <div className="w-full h-40 bg-gray-100 rounded border border-dashed border-gray-300 flex flex-col items-center justify-center mb-4">
          <span className="text-3xl mb-2">⬆️</span>
          <span className="text-gray-500">Add photos</span>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="border border-border rounded p-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Price"
          className="border border-border rounded p-2 text-sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-border rounded p-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border border-border rounded p-2 text-sm"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full mt-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Next"}
        </button>
        {success && (
          <div className="text-green-600 text-sm mt-2">{success}</div>
        )}
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
      {/* Right: Preview Card */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="font-bold text-lg mb-4 text-center">Preview</div>
          <div className="bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
            <div className="w-full h-64 bg-blue-100 rounded mb-4 flex items-center justify-center border border-blue-200">
              <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#60a5fa_0_2px,transparent_2px,transparent_8px)] rounded" />
            </div>
            <div className="font-bold text-xl mb-1">{title || "Title"}</div>
            <div className="text-lg font-semibold mb-1">{price || "Price"}</div>
            <div className="text-xs text-muted-foreground mb-2">
              Listed 1 hour ago
              <br />
              in Palo Alto, CA
            </div>
            <div className="font-bold text-sm mb-1">Seller Information</div>
            <div className="text-sm">{email || "Email"}</div>
            <div className="text-sm mt-2 text-gray-600">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
