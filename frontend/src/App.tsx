import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import ItineraryBuilder from "./pages/ItineraryBuilder";

// Protected Route Component - checks if user is logged in
interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes - require authentication */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-trip"
          element={
            <PrivateRoute>
              <CreateTrip />
            </PrivateRoute>
          }
        />
        <Route
          path="/itinerary"
          element={
            <PrivateRoute>
              <ItineraryBuilder />
            </PrivateRoute>
          }
        />

        {/* Catch-all route - redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;