import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on login page
  if (location.pathname === "/") {
    return null;
  }

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("currentTrip");
    localStorage.removeItem("itinerary");

    // Navigate to login
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-bold hover:text-indigo-100 transition flex items-center gap-2"
        >
          ✈️ Traveloop
        </button>

        {/* Navigation Buttons */}
        <div className="flex gap-2 md:gap-6 items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/dashboard")
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/create-trip")}
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/create-trip")
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
          >
            Create Trip
          </button>

          <button
            onClick={() => navigate("/itinerary")}
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/itinerary")
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
          >
            Itinerary
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;