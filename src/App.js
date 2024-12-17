import React, { useState, useEffect } from "react";
import axios from "axios";
import HolidayModal from "./components/HolidayModal";

function App() {
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('');
  const [type, setType] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch holidays from the backend
  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9000/api/fetch/?country=${country}&year=${year}&month=${month}&type=${type}`
      );
      const uniqueHolidays = response.data.filter(
        (holiday, index, self) =>
          index ===
          self.findIndex((h) => h.id === holiday.id || `${h.date}-${h.name}` === `${holiday.date}-${holiday.name}`)
      );
      setHolidays(uniqueHolidays);
      setFilteredHolidays(uniqueHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchHolidays = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9000/api/search/?query=${searchQuery.toLowerCase()}`
      );
      const uniqueHolidays = response.data.filter(
        (holiday, index, self) =>
          index ===
          self.findIndex((h) => h.id === holiday.id || `${h.date}-${h.name}` === `${holiday.date}-${holiday.name}`)
      );
      setFilteredHolidays(uniqueHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    searchHolidays();
  };

  // Fetch holidays on component mount or when country/year/month/type changes
  useEffect(() => {
    fetchHolidays();
  }, [country, year, month, type]);

  // Paginate the holidays list
  const paginateHolidays = (holidays) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return holidays.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredHolidays.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-teal-600 mb-4">
        Holiday Finder
      </h1>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4"
      >
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        >
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Year"
          className="p-2 border rounded w-full md:w-auto"
        />

        <select
          className="border p-2 mr-2"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        >
          <option value="">type</option>
          <option value="local">Local</option>
          <option value="religious">Religious</option>
          <option value="observance">observance</option>
          <option value="national">National</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search holidays"
          className="p-2 border rounded w-full md:w-auto"
        />

        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Search
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading holidays...</p>}

      {/* Holiday List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginateHolidays(filteredHolidays).map((holiday) => (
          <div
            key={`${holiday.date}-${holiday.id}`}
            className="p-4 border rounded shadow cursor-pointer bg-white hover:bg-teal-50"
            onClick={() => setSelectedHoliday(holiday)}
          >
            <h2 className="text-lg font-bold text-gray-800">{holiday.name}</h2>
            <p className="text-gray-600">{holiday.date}</p>
            <p className="text-gray-500">{holiday.type || "General Holiday"}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Previous
        </button>
        <span className="text-xl">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Next
        </button>
      </div>

      {/* Holiday Modal */}
      {selectedHoliday && (
        <HolidayModal
          holiday={selectedHoliday}
          onClose={() => setSelectedHoliday(null)}
        />
      )}
    </div>
  );
}

export default App;
