function CreateTrip() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Create New Trip
        </h1>

        <input
          type="text"
          placeholder="Trip Name"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="date"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="date"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <textarea
          placeholder="Trip Description"
          className="w-full border p-3 rounded-lg mb-4"
          rows={4}
        ></textarea>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Save Trip
        </button>
      </div>
    </div>
  )
}

export default CreateTrip