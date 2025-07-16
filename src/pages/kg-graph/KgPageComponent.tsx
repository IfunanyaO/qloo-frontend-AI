import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { toast } from 'react-toastify';
import { ChatLayout, PromptChat, PromptResultKg} from "@/features/chat/components";

const KgPageComponent: React.FC = () => {
  return (
    <ChatLayout>
      <div className="flex flex-row gap-12 h-full w-full">
        <div className="h-full flex-1 max-w-[252px]">
          <PromptChat />
        </div>

        Kg Endpoint For Test
        <div className="h-full flex-1 mt-auto">
          <PromptResultKg />
        </div>
      </div>
    </ChatLayout>
  );

};

export default KgPageComponent;

