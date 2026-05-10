function ItineraryBuilder() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Itinerary Builder
        </h1>

        <input
          type="text"
          placeholder="City Name"
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
          placeholder="Activities"
          className="w-full border p-3 rounded-lg mb-4"
          rows={4}
        ></textarea>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Add Stop
        </button>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Planned Stops
          </h2>

          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <h3 className="text-xl font-bold">Goa</h3>
            <p>12 May - 15 May</p>
            <p>Beach Visit, Water Sports</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <h3 className="text-xl font-bold">Jaipur</h3>
            <p>16 May - 18 May</p>
            <p>Fort Visit, Food Tour</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryBuilder