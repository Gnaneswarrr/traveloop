import { useState } from "react";
import Navbar from "../components/Navbar";
import ItineraryCard from "../components/ItineraryCard";
import BudgetCard from "../components/BudgetCard";
import FormError from "../components/FormError";

interface ItineraryBuilderProps {
  onBackToCreate?: () => void;
}

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

function ItineraryBuilder({ onBackToCreate }: ItineraryBuilderProps) {
  const [tripName, setTripName] = useState(
    () => JSON.parse(localStorage.getItem("currentTrip") || "{}").tripName || "My Trip"
  );
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

  const [city, setCity] = useState("");
  const [stopStartDate, setStopStartDate] = useState("");
  const [stopEndDate, setStopEndDate] = useState("");
  const [activityInput, setActivityInput] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [hotelCost, setHotelCost] = useState(0);
  const [foodCost, setFoodCost] = useState(0);
  const [activityCost, setActivityCost] = useState(0);

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

    if (stopStartDate && stopEndDate && new Date(stopStartDate) >= new Date(stopEndDate)) {
      newErrors.stopEndDate = "End date must be after start date";
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
      setErrors({ ...errors, activity: "Please select a stop first" });
      return;
    }

    if (!activityInput.trim()) {
      setErrors({ ...errors, activity: "Activity cannot be empty" });
      return;
    }

    const updatedStops = stops.map((stop) =>
      stop.id === selectedStopId
        ? { ...stop, activities: [...stop.activities, activityInput] }
        : stop
    );

    setStops(updatedStops);
    setActivityInput("");
    setErrors({ ...errors, activity: undefined });
  };

  const handleRemoveActivity = (stopId: string, activityIndex: number) => {
    const updatedStops = stops.map((stop) =>
      stop.id === stopId
        ? {
            ...stop,
            activities: stop.activities.filter((_, idx) => idx !== activityIndex),
          }
        : stop
    );
    setStops(updatedStops);
  };

  const handleRemoveStop = (stopId: string) => {
    setStops(stops.filter((stop) => stop.id !== stopId));
    if (selectedStopId === stopId) {
      setSelectedStopId(stops.length > 1 ? stops[0].id : null);
    }
  };

  const currentStop = stops.find((s) => s.id === selectedStopId);

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
                  Trip: <span className="font-semibold text-slate-800">{tripName}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("currentTrip");
                  onBackToCreate?.();
                }}
                className="px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
              >
                ← New Trip
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Add Stop & Activities */}
            <div className="lg:col-span-2">
              {/* Add Stop Section */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">➕ Add Stop</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      City Name
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) {
                          setErrors({ ...errors, city: undefined });
                        }
                      }}
                      placeholder="e.g., Goa, Paris, Tokyo"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FormError message={errors.city} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={stopStartDate}
                        onChange={(e) => {
                          setStopStartDate(e.target.value);
                          if (errors.stopStartDate) {
                            setErrors({ ...errors, stopStartDate: undefined });
                          }
                        }}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <FormError message={errors.stopStartDate} />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={stopEndDate}
                        onChange={(e) => {
                          setStopEndDate(e.target.value);
                          if (errors.stopEndDate) {
                            setErrors({ ...errors, stopEndDate: undefined });
                          }
                        }}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <FormError message={errors.stopEndDate} />
                    </div>
                  </div>

                  <button
                    onClick={handleAddStop}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-3 rounded-lg transition duration-200"
                  >
                    Add Stop to Itinerary
                  </button>
                </div>
              </div>

              {/* Add Activity Section */}
              {stops.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-indigo-700 mb-4">🎯 Add Activity</h2>

                  {selectedStopId && currentStop ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <p className="text-slate-700">
                          <span className="font-semibold">Current Stop:</span> {currentStop.city}{" "}
                          <span className="text-slate-500">
                            ({currentStop.startDate} - {currentStop.endDate})
                          </span>
                        </p>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-2">
                          Activity Description
                        </label>
                        <input
                          type="text"
                          value={activityInput}
                          onChange={(e) => {
                            setActivityInput(e.target.value);
                            if (errors.activity) {
                              setErrors({ ...errors, activity: undefined });
                            }
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") handleAddActivity();
                          }}
                          placeholder="e.g., Beach visit, Museum tour, Local restaurant"
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <FormError message={errors.activity} />
                      </div>

                      <button
                        onClick={handleAddActivity}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-lg transition duration-200"
                      >
                        Add Activity
                      </button>

                      {currentStop.activities.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-200">
                          <h3 className="font-semibold text-slate-700 mb-3">Activities:</h3>
                          <ul className="space-y-2">
                            {currentStop.activities.map((activity, idx) => (
                              <li
                                key={idx}
                                className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
                              >
                                <span className="text-slate-700">• {activity}</span>
                                <button
                                  onClick={() => handleRemoveActivity(selectedStopId, idx)}
                                  className="text-red-500 hover:text-red-700 font-bold transition"
                                >
                                  ✕
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-600 italic">Select a stop from the list below</p>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Budget & Stops List */}
            <div className="lg:col-span-1 space-y-8">
              {/* Budget Section */}
              <div>
                <BudgetCard
                  hotel={hotelCost}
                  food={foodCost}
                  activity={activityCost}
                  onHotelChange={setHotelCost}
                  onFoodChange={setFoodCost}
                  onActivityChange={setActivityCost}
                />
              </div>

              {/* Select Stop Section */}
              {stops.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="font-semibold text-slate-700 mb-4">Select Stop for Activities:</h3>
                  <div className="space-y-2">
                    {stops.map((stop) => (
                      <button
                        key={stop.id}
                        onClick={() => setSelectedStopId(stop.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                          selectedStopId === stop.id
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        📍 {stop.city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Itinerary Cards */}
          {stops.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                📋 Your Planned Stops ({stops.length})
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

          {/* Empty State */}
          {stops.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-slate-600 text-lg">
                Add your first stop to get started! 🚀
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ItineraryBuilder;