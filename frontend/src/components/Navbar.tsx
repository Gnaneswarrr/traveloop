function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Traveloop
      </h1>

      <div className="flex gap-6">
        <button>Dashboard</button>
        <button>Create Trip</button>
        <button>Budget</button>
      </div>
    </nav>
  )
}

export default Navbar