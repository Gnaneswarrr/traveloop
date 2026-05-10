import { useState } from "react";
import CreateTrip from "./pages/CreateTrip";
import ItineraryBuilder from "./pages/ItineraryBuilder";

function App() {
  const [currentPage, setCurrentPage] = useState<"create" | "itinerary">(
    () => {
      const savedTrip = localStorage.getItem("currentTrip");
      return savedTrip ? "itinerary" : "create";
    }
  );

  const handleTripCreated = () => {
    setCurrentPage("itinerary");
  };

  return currentPage === "create" ? (
    <CreateTrip onTripCreated={handleTripCreated} />
  ) : (
    <ItineraryBuilder onBackToCreate={() => setCurrentPage("create")} />
  );
}

export default App;