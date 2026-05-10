interface ItineraryCardProps {
  id: string;
  city: string;
  startDate: string;
  endDate: string;
  activities: string[];
  onRemoveStop: (id: string) => void;
}

function ItineraryCard({
  id,
  city,
  startDate,
  endDate,
  activities,
  onRemoveStop,
}: ItineraryCardProps) {
  const handleDelete = () => {
    if (window.confirm(`Remove ${city} from itinerary?`)) {
      onRemoveStop(id);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-indigo-700">📍 {city}</h3>
          <p className="text-slate-600 text-sm">
            {startDate} → {endDate}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 font-bold text-lg transition"
          title="Remove this stop"
        >
          ✕
        </button>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-slate-700 mb-2">🎯 Activities:</h4>
        {activities.length > 0 ? (
          <ul className="space-y-1">
            {activities.map((activity, idx) => (
              <li key={idx} className="text-slate-600 text-sm">
                • {activity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm italic">No activities added yet</p>
        )}
      </div>
    </div>
  );
}

export default ItineraryCard;
