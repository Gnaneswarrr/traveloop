import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormError from "../components/FormError";

interface Errors {
  tripName?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

function CreateTrip() {
  const navigate = useNavigate();

  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!tripName.trim()) {
      newErrors.tripName = "Trip name is required";
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!endDate) {
      newErrors.endDate = "End date is required";
    }

    if (startDate && endDate && startDate >= endDate) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!description.trim()) {
      newErrors.description = "Trip description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const tripData = {
        tripName,
        startDate,
        endDate,
        description,
      };

      localStorage.setItem("currentTrip", JSON.stringify(tripData));

      setTripName("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      setErrors({});

      navigate("/itinerary");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-indigo-700 mb-3">
                ✈️ Create Your Trip
              </h1>

              <p className="text-slate-600 text-lg">
                Plan your next adventure with Traveloop
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Name */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Trip Name
                </label>

                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => {
                    setTripName(e.target.value);

                    if (errors.tripName) {
                      setErrors({
                        ...errors,
                        tripName: undefined,
                      });
                    }
                  }}
                  placeholder="e.g. Goa Summer Adventure"
                  className="w-full border border-slate-300 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />

                <FormError message={errors.tripName} />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    📅 Start Date
                  </label>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);

                      if (errors.startDate) {
                        setErrors({
                          ...errors,
                          startDate: undefined,
                        });
                      }
                    }}
                    className="w-full border border-slate-300 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <FormError message={errors.startDate} />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    📅 End Date
                  </label>

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);

                      if (errors.endDate) {
                        setErrors({
                          ...errors,
                          endDate: undefined,
                        });
                      }
                    }}
                    className="w-full border border-slate-300 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <FormError message={errors.endDate} />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Trip Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);

                    if (errors.description) {
                      setErrors({
                        ...errors,
                        description: undefined,
                      });
                    }
                  }}
                  placeholder="Describe your trip goals, budget, places, interests..."
                  rows={5}
                  className="w-full border border-slate-300 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />

                <FormError message={errors.description} />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-4 rounded-xl transition shadow-md hover:shadow-lg text-lg"
                >
                  Continue to Itinerary →
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold px-6 py-4 rounded-xl transition text-lg"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTrip;