
async function fetchVehicleModels(makeName, year) {
  const apiUrl = process.env.NEXT_PUBLIC_MAIN_URL;

    try {
      const res = await fetch(`${apiUrl}/vehicles/GetModelsForMakeYear/make/${makeName}/modelyear/${year}?format=json`);
      const data = await res.json();
      return data.Results || [];
    } catch (error) {
      console.error('Error fetching vehicle models:', error);
      return [];
    }
  }
  
  export default async function Result({ params }) {
    const { makeId: makeName, year } = params;  
    const models = await fetchVehicleModels(makeName, year);
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl mb-4">Vehicle Models for {makeName} ({year})</h1>
          <ul>
            {models.length > 0 ? (
              models.map((model) => (
                <li key={model.Model_ID} className="mb-2">{model.Model_Name}</li>
              ))
            ) : (
              <li>Models not found for this make and year.</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  