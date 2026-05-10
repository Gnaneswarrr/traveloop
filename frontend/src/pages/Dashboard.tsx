function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Traveloop Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">Upcoming Trips</h2>
          <p className="mt-2 text-gray-600">3 Planned Trips</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">Budget Overview</h2>
          <p className="mt-2 text-gray-600">₹45,000 Total Budget</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">Top Destination</h2>
          <p className="mt-2 text-gray-600">Goa</p>
        </div>
      </div>

      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl">
        Plan New Trip
      </button>
    </div>
  )
}

export default Dashboard