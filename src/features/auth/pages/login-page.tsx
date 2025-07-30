import { Interaction } from "@/components/interaction";
import classNames from "classnames";

import GoogleIcon from "@/assets/images/svg/google.svg";
import { FullLogo } from "@/components/ui/full-logo";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="h-screen text-text-light dark:text-text-dark w-full flex flex-row items-stretch bg-background-light dark:bg-background-dark">
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center h-full px-8">
          <div className="max-w-[510px]">
            <h3 className="text-[40px] font-bold text-start leading-normal">
              Join{" "}
              <span className="text-text-light/40 dark:text-text-dark/40">
                Tania
              </span>{" "}
              CultureTrip Planner{" "}
              <span className="text-text-light/40 dark:text-text-dark/40">
                Platform
              </span>
            </h3>
            <p className="text-[20px] text-text-light/40 dark:text-text-dark/40">
              A smart travel planner that builds customized trip itineraries based on a user’s tastes (e.g., music, fashion, food, books), mood, or goals (relax, explore, party).
              You input a destination + vibe, and it creates a culturally rich itinerary using Qloo's Taste AI and OpenAI.

            </p>

            <div className="mt-8">
              <Interaction
                className={classNames(
                  "bg-transparent border-[1px] border-black dark:border-white rounded-[50px] py-[8px] px-[40px] w-full",
                  "hover:border-primary hover:bg-primary hover:text-white"
                )}
                onClick={() => login()}
              >
                <div className="flex flex-row justify-center items-center gap-4">
                  <GoogleIcon />
                  <p>Continue with Google</p>
                </div>
              </Interaction>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="gradient-blur absolute top-0 left-0"></div>
        <div className="relative flex flex-col items-center justify-center h-full px-8">
          <FullLogo
            logoClassName="!h-[40px] !w-[40px]"
            textClassName="text-text-dark text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};
