interface BudgetCardProps {
  hotel: number;
  food: number;
  activity: number;
  onHotelChange: (value: number) => void;
  onFoodChange: (value: number) => void;
  onActivityChange: (value: number) => void;
}

function BudgetCard({
  hotel,
  food,
  activity,
  onHotelChange,
  onFoodChange,
  onActivityChange,
}: BudgetCardProps) {
  const total = hotel + food + activity;

  const handleInputChange = (
    value: string,
    callback: (val: number) => void
  ) => {
    const num = parseFloat(value) || 0;
    callback(Math.max(0, num));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-teal-50 border border-indigo-200 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">💰 Budget Planner</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            🏨 Hotel Cost
          </label>
          <div className="flex items-center">
            <span className="text-slate-600 mr-2">₹</span>
            <input
              type="number"
              value={hotel || ""}
              onChange={(e) => handleInputChange(e.target.value, onHotelChange)}
              placeholder="0"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            🍴 Food Cost
          </label>
          <div className="flex items-center">
            <span className="text-slate-600 mr-2">₹</span>
            <input
              type="number"
              value={food || ""}
              onChange={(e) => handleInputChange(e.target.value, onFoodChange)}
              placeholder="0"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            🎢 Activity Cost
          </label>
          <div className="flex items-center">
            <span className="text-slate-600 mr-2">₹</span>
            <input
              type="number"
              value={activity || ""}
              onChange={(e) => handleInputChange(e.target.value, onActivityChange)}
              placeholder="0"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t-2 border-indigo-300 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-slate-700">Total Budget:</span>
          <span className="text-3xl font-bold text-indigo-700">
            ₹ {total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
