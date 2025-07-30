import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface ItineraryViewerProps {
  content: string;
}

const ItineraryViewer: FC<ItineraryViewerProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white"
      >
        Your Itinerary
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl font-bold mt-6 mb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-semibold mt-4 mb-2" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="ml-6 list-disc text-gray-700 dark:text-gray-300 mb-1" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </motion.div>
    </motion.div>
  );
};

export default ItineraryViewer;
