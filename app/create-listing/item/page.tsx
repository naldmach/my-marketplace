export default function CreateItemPage() {
  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Create Item for Sale</h1>
      <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
        {/* Placeholder form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border border-border rounded p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Price"
            className="border border-border rounded p-2 text-sm"
          />
          <textarea
            placeholder="Description"
            className="border border-border rounded p-2 text-sm"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full mt-2"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}
