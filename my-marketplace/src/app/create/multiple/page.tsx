import React from "react";

export default function CreateMultipleListingsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left: Upload Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
        <div className="w-full h-40 bg-gray-100 rounded border border-dashed border-gray-300 flex flex-col items-center justify-center mb-4">
          <span className="text-3xl mb-2">⬆️</span>
          <span className="text-gray-500 text-center">
            Upload CSV or spreadsheet
          </span>
        </div>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full mt-2"
        >
          Next
        </button>
      </div>
      {/* Right: Preview Card */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="font-bold text-lg mb-4 text-center">Preview</div>
          <div className="bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm min-h-[200px] items-center justify-center">
            <span className="text-gray-500">
              Preview of uploaded listings will appear here.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
