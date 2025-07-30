import type React from "react";
import axios from "axios";
import { Interaction } from "@/components/interaction";
import SendIcon from "@/assets/images/svg/send.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from './chat-input.module.css';
// import { useState } from "react";
import { useModelStore } from "@/store/useModelStore";

// import { toast } from 'react-toastify';
import { useClaimStore } from "@/store/useClaimStore";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/auth";
import { VITE_API_BASE_URL} from "@/utils/constants";


type ChatInputProps = {
  onSend: (message: string) => void;
  sending: boolean;
};

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  
  const API_BASE_URL = VITE_API_BASE_URL;

const setPrevClaim = useClaimStore((state) => state.setPrevClaim);
  const claim = useClaimStore((state) => state.claim);
  const setClaim = useClaimStore((state) => state.setClaim);
  const isClaimLoading = useClaimStore((state) => state.isClaimLoading);
  const setIsClaimLoading = useClaimStore((state) => state.setIsClaimLoading);
  const selectedModel = useModelStore((state) => state.selectedModel);
  const setClaimData =  useClaimStore((state) => state.setClaimData);
  const setClaimDataForChat = useClaimStore((state) => state.setClaimDataForChat);
  const { addMessage } = useChatStore();
   const { user, isAuthenticated } = useAuthStore();
  
  const handleSendCultureTrip = async () => {
    // toast.success("Ask anything");
    const trip_info = claim.trim();
    if (!trip_info) return false;

    setIsClaimLoading(true);
    setPrevClaim(trip_info);
    addMessage({
        content: trip_info,
        isSystem: false,
    });
      setClaim("");
    console.log(selectedModel + isAuthenticated + " " + user?.id );

    try {

      // let bodyInfo =   {
      //   trip_claim: trip_info,
      //   model: selectedModel,
      //   loggedIn: true,
      //   sessionId: "dbea7932-f80d-49d5-a915-0fa2ca7df43b"
      //   // loggedIn: false,
      //   // sessionId: null (User ID)
      // }

      let bodyInfo =   {
        prompt: trip_info,
        model: selectedModel,
        loggedIn: isAuthenticated,
        sessionId: user?.id
        // loggedIn: false,
        // sessionId: null (User ID)
      }

      console.log("bodyinfo", bodyInfo);

      const response = await axios.get(`${API_BASE_URL}/trip/test`);
      // const response = await axios.post(`${API_BASE_URL}/trip/extract-info`, bodyInfo);
      // const response = await axios.post(`${API_BASE_URL}/endpoint/plan-trip`, bodyInfo);

     
      console.log("Cleaned response:", response.data);

      // simulate loading
      // setTimeout(() => setIsClaimLoading(false), 3000);

      setClaimData(response.data)
      setClaimDataForChat(claim, response.data)
    //   const mockResponse = {
    //       data: {
    //         destination: "Lisbon",
    //         tastes: ["jazz music", "seafood", "indie bookstores"],
    //         style: ["relaxing", "low budget"],
    //         duration: "5 days",
    //         itinerary: "## Day 1 (September 1st, 2025)\n\n#### Morning\nBegin your Lisbon adventure at the **Note! Ferreira Borges**. This cozy stationery shop also sells a variety of magazines and has a quaint indie ambience. Ideal for those who love to browse bookstores. \n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Note!+Ferreira+Borges+Lisbon)  \n🌐 http://www.noteonline.pt/  \n⭐ Rating: 4.3  \n\n#### Afternoon \nNext, enjoy lunch at the **Solar dos Presuntos**, a delightful eatery known for its delicious Portuguese food, especially seafood. Don't forget to try the octopus!\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Solar+dos+Presuntos+Lisbon)  \n📞 +351213424253  \n🌐 http://www.solardospresuntos.com/  \n⭐ Rating: 4.5  \n\n#### Evening \nEnd your day with a relaxing night of live jazz music at **Spicy cafe** which also serves delightful tartines. Let the rhythmic melodies carry you into the Portuguese nightlife. \n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Spicy+cafe+Lisbon)  \n📞 +351218246561  \n🌐 http://spicycafe.eatbu.com/  \n⭐ Rating: 4.2  \n\nWeather: Clear Sky, 28.4°C - a casual, airy outfit would be suitable.\n\n## Day 2 (September 2nd, 2025)\n\n#### Morning  \nStart your day with a trip to **Tinta nos Nervos**. This unique bookstore specializes in art space, and illustrative masterpieces - a paradise for indie bookstore enthusiasts.\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Tinta+nos+Nervos+Lisbon)  \n📞 +351213951179  \n🌐 http://tintanosnervos.com/  \n⭐ Rating: 4.9\n\n#### Afternoon \nTreat your taste buds to a budget-friendly lunch at **Mineiro da Brandoa**. The restaurant offers a variety of buffet options for a great price.\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Mineiro+da+Brandoa+Lisbon)  \n📞 +351962717643  \n🌐 http://mineiro.com.pt/brandoa  \n⭐ Rating: 4.1  \n\n#### Evening  \nUnwind with dinner at the **Brasuca**. Known for its feijoada and moqueca, this spot is a haven for seafood.\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Brasuca+Lisbon)  \n📞 +351213220740  \n🌐 http://www.restaurantebrasuca.com/  \n⭐ Rating: 4.5\n\nWeather: Clear Sky, 28.76°C - don't forget sunscreen and a hat.\n\n## Day 3 (September 3rd, 2025)\n\n#### Morning  \nGrab a book and chill at **Starbucks**. They also offer a nice selection of cakes in a comfortable environment which makes the price totally worth it. \n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Starbucks+Lisbon)  \n📞 +351932908856  \n🌐 http://www.starbucks.pt/  \n⭐ Rating: 4.1  \n\n#### Afternoon \nSomething unique on the menu for lunch: **O Velho Farelo**, known for its grilled meals including the delicious seafood espetada. \n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=O+Velho+Farelo+Lisbon)  \n📞 +351211531455  \n🌐 https://www.facebook.com/velhofarelo/  \n⭐ Rating: 4.1 \n\n#### Evening  \nMingle with the locals on a relaxed evening at **Alfama Rio**. This spot is a hit among locals and tourists for its burgers, prices, and sangria! \n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Alfama+Rio+Lisbon)  \n📞 +351919094169  \n🌐 https://www.facebook.com/21Alfama.Rio/  \n⭐ Rating: 4.6\n\nWeather: Clear Sky, 28.08°C - stay cool and hydrated.\n\n## Day 4 (September 4th, 2025)\n\n#### Morning  \nBegin the day with a delicious breakfast at **A Padaria Portuguesa**. Known for its flavorful croissants, this place offers great food at great prices.\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=A+Padaria+Portuguesa+Lisbon)  \n📞 +351926963656  \n🌐 http://www.apadariaportuguesa.pt/  \n⭐ Rating: 3.8\n\n#### Afternoon  \nFor lunch, try the buffet at **Sihai**. The price is friendly, and the crepes are to die for.\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Sihai+Lisbon)  \n📞 +351217609943  \n⭐ Rating: 4  \n\n#### Evening  \nIndulge in the lively vibes of **Hamburgueria do Bairro (São Bento)** for dinner. They also have tantalizing vegan options, and their prices are great for a budget-friendly trip.\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Hamburgueria+do+Bairro+(São+Bento)+Lisbon)  \n📞 +351213960405   \n🌐 http://www.hamburgueriadobairro.pt/  \n⭐ Rating: 4.1  \n\nWeather: Clear Sky, 25.95°C - layer your outfit for a cooler evening.\n\n## Day 5 (September 5th, 2025)\n\n#### Morning  \nSqueeze in one more indie bookshop visit to **World Academy**. This short course institute also houses an amazing collection of interesting books.\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=World+Academy+Lisbon)  \n📞 +351218210366  \n🌐 http://www.worldacademy.pt/  \n⭐ Rating: 4.3\n\n#### Afternoon  \nA trip to Lisbon would be incomplete without visiting **Sabores da Ilha**. Positioned near a shopping center, this place offers tasty wood-fired espetada!\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Sabores+da+Ilha+Lisbon)  \n📞 +351214072176  \n🌐 https://www.tripadvisor.pt/Restaurant_Review-g2218978-d13350741-Reviews-Sabores_Da_Ilha-Carnaxide_Lisbon_District_Central_Portugal.html  \n⭐ Rating: 3.6\n\n#### Evening  \nEnd your Lisbon tour with a sweet stop at **Leonidas Campo de Ourique**. This spot is famous for its delicious jams!\n\n📍 [Map it](https://www.google.com/maps/search/?api=1&query=Leonidas+Campo+de+Ourique+Lisbon)  \n📞 +351214074023  \n🌐 https://www.facebook.com/leonidaschocolateecafe  \n⭐ Rating: 4.9  \n\nWeather: Clear Sky, 29.09°C - keep it summer-casual, with a light top and shorts.\n\n# Recap: \"A melody of savory seafood, soulful jazz, and indie bookstores veiled in Lisbon’s allure. A budget-friendly retreat into relaxation. 5 days in Lisbon, a rhythm echoing through time!\" 🎷📖🦐\n"
    //       }
    // }

    //   setClaimData(mockResponse.data)
    //   setClaimDataForChat(claim, mockResponse.data)

      onSend?.(trip_info);
    
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send the request.");
    }finally {
      // Always executed regardless of success or failure
      setIsClaimLoading(false);
    }
  };

  return (
    <div className="w-full bg-surface-light dark:bg-surface-dark rounded-[40px]">
      <div className="flex flex-row items-start px-4 py-2">
        <TextareaAutosize
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          className={`${styles.scrollbar} flex-1 text-sm bg-transparent outline-none resize-none placeholder:text-text-light/40 dark:placeholder:text-text-dark/20 text-text-light dark:text-text-dark leading-snug`}
          placeholder="Ask anything"
          minRows={1}
          maxRows={5}
        />

       <Interaction
          onClick={handleSendCultureTrip}
          title="Send Your Trip Information"
          disabled={isClaimLoading}
          className={`rounded-full bg-white flex items-center justify-center mt-1 transition-opacity ${
            isClaimLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <SendIcon />
        </Interaction>
      </div>
    </div>
  );
};
