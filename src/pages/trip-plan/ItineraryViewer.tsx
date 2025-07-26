import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface ItineraryViewerProps {
  content: string;
}

const ItineraryViewer: FC<ItineraryViewerProps> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Your Itinerary</h2>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="text-gray-700 mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ItineraryViewer;
