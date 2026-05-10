import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ItineraryCard from "../components/ItineraryCard";
import BudgetCard from "../components/BudgetCard";
import FormError from "../components/FormError";

interface Stop {
  id: string;
  city: string;
  startDate: string;
  endDate: string;
  activities: string[];
}

interface Errors {
  city?: string;
  stopStartDate?: string;
  stopEndDate?: string;
  activity?: string;
}

function ItineraryBuilder() {
  const navigate = useNavigate();

  const getTripName = () => {
    try {
      const tripData = localStorage.getItem("currentTrip");
      return tripData ? JSON.parse(tripData).tripName || "My Trip" : "My Trip";
    } catch {
      return "My Trip";
    }
  };

  const getSavedItinerary = () => {
    try {
      const saved = localStorage.getItem("itinerary");

      if (saved) {
        const data = JSON.parse(saved);

        return {
          stops: data.stops || [],
          hotelCost: data.hotelCost || 0,
          foodCost: data.foodCost || 0,
          activityCost: data.activityCost || 0,
        };
      }
    } catch {
      console.log("Failed to load itinerary");
    }

    return {
      stops: [],
      hotelCost: 0,
      foodCost: 0,
      activityCost: 0,
    };
  };

  const tripName = getTripName();
  const savedData = getSavedItinerary();

  const [stops, setStops] = useState<Stop[]>(savedData.stops);

  const [selectedStopId, setSelectedStopId] = useState<string | null>(
    savedData.stops.length > 0 ? savedData.stops[0].id : null
  );

  const [city, setCity] = useState("");
  const [stopStartDate, setStopStartDate] = useState("");
  const [stopEndDate, setStopEndDate] = useState("");
  const [activityInput, setActivityInput] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [hotelCost, setHotelCost] = useState(savedData.hotelCost);
  const [foodCost, setFoodCost] = useState(savedData.foodCost);
  const [activityCost, setActivityCost] = useState(savedData.activityCost);

  useEffect(() => {
    const itineraryData = {
      stops,
      hotelCost,
      foodCost,
      activityCost,
    };

    localStorage.setItem("itinerary", JSON.stringify(itineraryData));
  }, [stops, hotelCost, foodCost, activityCost]);

  const generateId = () => `stop_${Date.now()}`;

  const validateStop = (): boolean => {
    const newErrors: Errors = {};

    if (!city.trim()) {
      newErrors.city = "City name is required";
    }

    if (!stopStartDate) {
      newErrors.stopStartDate = "Start date is required";
    }

    if (!stopEndDate) {
      newErrors.stopEndDate = "End date is required";
    }

    if (
      stopStartDate &&
      stopEndDate &&
      stopStartDate >= stopEndDate
    ) {
      newErrors.stopEndDate =
        "End date must be after start date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddStop = () => {
    if (!validateStop()) return;

    const newStop: Stop = {
      id: generateId(),
      city,
      startDate: stopStartDate,
      endDate: stopEndDate,
      activities: [],
    };

    setStops([...stops, newStop]);
    setSelectedStopId(newStop.id);

    setCity("");
    setStopStartDate("");
    setStopEndDate("");
    setActivityInput("");
    setErrors({});
  };

  const handleAddActivity = () => {
    if (!selectedStopId) {
      setErrors({
        ...errors,
        activity: "Please select a stop first",
      });

      return;
    }

    if (!activityInput.trim()) {
      setErrors({
        ...errors,
        activity: "Activity cannot be empty",
      });

      return;
    }

    const updatedStops = stops.map((stop) =>
      stop.id === selectedStopId
        ? {
            ...stop,
            activities: [...stop.activities, activityInput],
          }
        : stop
    );

    setStops(updatedStops);
    setActivityInput("");

    setErrors({
      ...errors,
      activity: undefined,
    });
  };

  const handleRemoveStop = (stopId: string) => {
    setStops(stops.filter((stop) => stop.id !== stopId));

    if (selectedStopId === stopId) {
      setSelectedStopId(
        stops.length > 1 ? stops[0].id : null
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-indigo-700 mb-2">
                  🗺️ Plan Your Itinerary
                </h1>

                <p className="text-slate-600 text-lg">
                  Trip:
                  <span className="font-semibold text-slate-800 ml-2">
                    {tripName}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition font-semibold"
              >
                ← Back
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Section */}
            <div className="lg:col-span-2">

              {/* Add Stop */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                  ➕ Add Stop
                </h2>

                <div className="space-y-4">

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      City Name
                    </label>

                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Goa, Paris, Tokyo"
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <FormError message={errors.city} />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <label className="block text-slate-700 font-semibold mb-2">
                        📅 Start Date
                      </label>

                      <input
                        type="date"
                        value={stopStartDate}
                        onChange={(e) =>
                          setStopStartDate(e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <FormError
                        message={errors.stopStartDate}
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-2">
                        📅 End Date
                      </label>

                      <input
                        type="date"
                        value={stopEndDate}
                        onChange={(e) =>
                          setStopEndDate(e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <FormError
                        message={errors.stopEndDate}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAddStop}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-3 rounded-lg transition"
                  >
                    Add Stop
                  </button>
                </div>
              </div>

              {/* Activities */}
              {stops.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">

                  <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                    🎯 Add Activity
                  </h2>

                  <input
                    type="text"
                    value={activityInput}
                    onChange={(e) =>
                      setActivityInput(e.target.value)
                    }
                    placeholder="e.g. Beach visit"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <FormError message={errors.activity} />

                  <button
                    onClick={handleAddActivity}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-lg transition"
                  >
                    Add Activity
                  </button>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="space-y-8">

              <BudgetCard
                hotel={hotelCost}
                food={foodCost}
                activity={activityCost}
                onHotelChange={setHotelCost}
                onFoodChange={setFoodCost}
                onActivityChange={setActivityCost}
              />

            </div>
          </div>

          {/* Stops */}
          {stops.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8">

              <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                📋 Your Planned Stops
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {stops.map((stop) => (
                  <ItineraryCard
                    key={stop.id}
                    id={stop.id}
                    city={stop.city}
                    startDate={stop.startDate}
                    endDate={stop.endDate}
                    activities={stop.activities}
                    onRemoveStop={handleRemoveStop}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ItineraryBuilder;