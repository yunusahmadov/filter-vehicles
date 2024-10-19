'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (a, b) => currentYear - b);

  // Fetching vehicle makes
  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then(response => response.json())
      .then(data => setMakes(data.Results));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-4">Select Vehicle Make and Model Year</h1>

        {/* Vehicle Makes  */}

        <select
  className="w-full p-2 border rounded mb-4"
  value={selectedMake}
  onChange={(e) => setSelectedMake(e.target.value)}
>
  <option value="">Select Make</option>
  {makes.map(make => (
    <option key={make.MakeId} value={make.MakeName}> {/* Используем MakeName */}
      {make.MakeName}
    </option>
  ))}
</select>


        {/* Model Year  */}
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* "Next" Button */}
        <Link href={`/result/${selectedMake}/${selectedYear}`}>
          <button
            className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={!selectedMake || !selectedYear}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
