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

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!description.trim()) {
      newErrors.description = "Trip description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-indigo-700 mb-2">
                ✈️ Create Your Trip
              </h1>
              <p className="text-slate-600">
                Plan your next adventure with Traveloop
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                      setErrors({ ...errors, tripName: undefined });
                    }
                  }}
                  placeholder="e.g., Summer Goa Adventure"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                <FormError message={errors.tripName} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      if (errors.startDate) {
                        setErrors({ ...errors, startDate: undefined });
                      }
                    }}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                  <FormError message={errors.startDate} />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      if (errors.endDate) {
                        setErrors({ ...errors, endDate: undefined });
                      }
                    }}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                  <FormError message={errors.endDate} />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Trip Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) {
                      setErrors({ ...errors, description: undefined });
                    }
                  }}
                  placeholder="Describe your trip goals, budget, interests..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                  rows={4}
                />
                <FormError message={errors.description} />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Continue to Itinerary Builder →
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold px-6 py-3 rounded-lg transition duration-200"
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