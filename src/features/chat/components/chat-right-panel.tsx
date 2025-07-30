import type React from "react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Interaction } from "@/components/interaction";
import AddIcon from "@/assets/images/svg/add-circle-filled.svg";
import { useModelStore } from "@/store/useModelStore"; 
import { useAuthStore } from "@/store/auth";
import { useClaimStore } from "@/store/useClaimStore";
import { useChatStore } from "@/store/useChatStore";
import { VITE_API_BASE_URL} from "@/utils/constants";
import ItineraryViewer from '../../../pages/trip-plan/ItineraryViewer';

const options = ["gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"];

// const history = [
//   "Judging Creative Onchain Hackathon",
//   "Valora vs Traditional Banks",
// ];

// const previous = ["Bacteriology overview"];

export const ChatRightPanel: React.FC = () => {
  const API_BASE_URL = VITE_API_BASE_URL;
  const clearAll = useClaimStore((state) => state.clearAll);
  const clearClaimStore = useClaimStore((state) => state.clearAll);
  const clearChatStore = useChatStore((state) => state.clearThread);

  // const [activePrevious] = useState<number>(0);
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
   const { user, isAuthenticated } = useAuthStore();
   const claimData = useClaimStore((state) => state.claimData);

  const { selectedModel, setSelectedModel } = useModelStore();

  // const createNewChat = () => {
  //   alert("New Chat");
  //   clearAll();
  //   clearAll
  // }

  const handleResetAll = () => {
    clearClaimStore();
    clearChatStore();
    clearAll();
  };

const [claimHistory, setClaimHistory] = useState<any>([]);
const userId = user?.id; // you can replace with dynamic state if available
// const userId = "dbea7932-f80d-49d5-a915-0fa2ca7df43b"

useEffect(() => {
  if (!isAuthenticated) return;

  const fetchHistory = async () => {
   try {
  const res = await fetch(`${API_BASE_URL}/sql/history/${userId}`);

  if (!res.ok) {
    if (res.status === 404) {
      // No claims found for this user
      setClaimHistory([]); // set empty history to avoid breaking the UI
    } else {
      throw new Error(`Request failed with status ${res.status}`);
    }
  } else {
    const data = await res.json();
    console.log("history", data);
    setClaimHistory(data);
  }
} catch (err) {
  console.error("Failed to fetch claim history:", err);
}
  };

  fetchHistory();
}, [isAuthenticated, claimData]);

const yesterday:any = [];
const last30Days:any = [];

claimHistory.forEach((entry:any) => {
  const timestamp = new Date(entry.created_at);
  const now = new Date();
  const diffInDays = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays <= 1) {
    yesterday.push(entry);
  } else if (diffInDays <= 30) {
    last30Days.push(entry);
  }
});

const [showModal, setShowModal] = useState(false);
const [rawJson, setRawJson] = useState("");

const showHistoryTrip = (itinerary: string) => {
  // console.log(itinerary);
  setShowModal(true)
  setRawJson(itinerary)
}

  return (
    <>
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-2xl overflow-auto max-h-[80%]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Raw Data JSON</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Close
                  </button>
                </div>
                <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {/* {JSON.stringify(rawJson, null, 2)} */}
                  <ItineraryViewer content={rawJson} />
                </pre>
              </div>
            </div>
          )}

        <div>
          <div className="w-[300px] bg-surface-light dark:bg-surface-dark rounded-[12px] p-4">
            <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">
              Open AI Models
            </p>

            <div>
              {options.map((option) => (
                <div
                  key={`llm-${option}`}
                  onClick={() => setSelectedModel(option)}
                  className={classNames(
                    "transition-all duration-200 cursor-pointer w-full px-4 py-3 rounded-[12px]",
                    "hover:bg-surface-1-light hover:dark:bg-surface-1-dark",
                    {
                      "bg-surface-1-light dark:bg-surface-1-dark": selectedModel === option,
                    }
                  )}
                >
                  <p className="uppercase text-text-light/70 dark:text-text-dark/40 text-sm">
                    {option}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 w-full flex justify-between">
              <h5 className="text-text-light/80 text-base">History</h5>

              <Interaction  onClick={handleResetAll}>
                <AddIcon className="text-primary" />
              </Interaction>
            </div>

          {isAuthenticated ? (
            <div className="w-[300px] max-h-[400px] overflow-y-auto bg-surface-light dark:bg-surface-dark rounded-[12px] p-4 custom-scroll">

            {claimHistory.length <= 0 && (
              <>
                <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">Recent</p>
              
                  <div  className="px-4 py-3 rounded-[12px] hover:bg-surface-1-light hover:dark:bg-surface-1-dark cursor-pointer">
                    <p className="text-sm truncate text-text-light/70 dark:text-text-dark/40">No history available at this time</p>
                  </div>
                
              </>
        )}
        {yesterday.length > 0 && (
          <>
            <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">Recent</p>
            {yesterday.map((item:any, index:any) => (
              <div onClick={() => showHistoryTrip(item.generated_itinerary)}  title={item.prompt} key={`yesterday-${index}`} className="px-4 py-3 rounded-[12px] hover:bg-surface-1-light hover:dark:bg-surface-1-dark cursor-pointer">
                <p className="text-sm truncate text-text-light/70 dark:text-text-dark/40">{item.prompt}</p>
                <p className="text-xs text-gray-400">{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
          </>
        )}

        {last30Days.length > 0 && (
          <>
            <p className="mt-4 mb-2 text-text-light/40 dark:text-text-dark/10 text-base">Previous 30 Days</p>
            {last30Days.map((item:any, index:any) => (
              <div onClick={() => showHistoryTrip(item.generated_itinerary)} title={item.prompt} key={`last30-${index}`} className="px-4 py-3 rounded-[12px] hover:bg-surface-1-light hover:dark:bg-surface-1-dark cursor-pointer">
                <p className="text-sm truncate text-text-light/70 dark:text-text-dark/40">{item.prompt}</p>
                <p className="text-xs text-gray-400">{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
          </>
        )}
      </div>
    ) : (
      <div className="w-[300px] bg-surface-light dark:bg-surface-dark rounded-[12px] p-4">
        History is only available for logged in users.
      </div>
    )}

          </div>
        </div>
    </>
  
  );
};
