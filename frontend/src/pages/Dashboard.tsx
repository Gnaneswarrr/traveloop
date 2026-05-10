import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface UserInfo {
  email: string;
  name: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleCreateTrip = () => {
    // Clear previous trip data and go to create trip
    localStorage.removeItem("currentTrip");
    localStorage.removeItem("itinerary");
    navigate("/create-trip");
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-indigo-700 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-slate-600">Let's plan your next amazing adventure</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Upcoming Trips Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-indigo-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold">Upcoming Trips</p>
                  <h2 className="text-3xl font-bold text-indigo-700 mt-2">0</h2>
                </div>
                <div className="text-4xl">✈️</div>
              </div>
            </div>

            {/* Total Budget Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-teal-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold">Total Budget</p>
                  <h2 className="text-3xl font-bold text-teal-700 mt-2">₹0</h2>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>

            {/* Top Destination Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-orange-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold">Top Destination</p>
                  <h2 className="text-3xl font-bold text-orange-700 mt-2">-</h2>
                </div>
                <div className="text-4xl">📍</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Ready to explore?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Create New Trip */}
              <button
                onClick={handleCreateTrip}
                className="group bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold px-8 py-4 rounded-lg transition duration-200 transform hover:scale-105 flex items-center justify-between"
              >
                <span>Plan New Trip</span>
                <span className="text-2xl group-hover:translate-x-2 transition">→</span>
              </button>

              {/* View Saved Trips (Disabled for MVP) */}
              <button
                disabled
                className="bg-slate-200 text-slate-600 font-semibold px-8 py-4 rounded-lg cursor-not-allowed"
              >
                View Saved Trips (Coming Soon)
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-3">💡 Tip for Better Trip Planning</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>✓ Set clear trip dates to get accurate budget estimates</li>
              <li>✓ Add multiple stops to explore diverse destinations</li>
              <li>✓ Include various activities (food, adventure, culture)</li>
              <li>✓ Plan your budget carefully to avoid overspending</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;