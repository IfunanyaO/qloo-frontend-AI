import { useState } from 'react';
import ItineraryViewer from './ItineraryViewer';
import { VITE_API_BASE_URL} from "@/utils/constants";

export default function PlanPage() {
  const [itinerary, setItinerary] = useState<string | null>(null);

const handlePlanTrip = async () => {
  const response = await fetch(`${VITE_API_BASE_URL}/endpoint/plan-trip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: "I want a 5-day trip to Lisbon, into jazz music and indie bookstores, something relaxing and low budget."
    })
  });

  const data = await response.json();
  setItinerary(data.itinerary); // or handle full response if needed
};


  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <button
        onClick={handlePlanTrip}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Generate Itinerary
      </button>

      {itinerary && <ItineraryViewer content={itinerary} />}
    </div>
  );
}
