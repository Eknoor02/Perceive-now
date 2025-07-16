import React, { useState } from 'react';

function TraceCard({ trace }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getConfidenceColor = (score) => {
    if (score > 90) return 'text-green-600 dark:text-green-400';
    if (score > 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-gray-50 dark:bg-purple-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-purple-700">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{trace.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{trace.type}</p>
        </div>
        <div className="flex items-center">
          <span className={`text-md font-bold ${getConfidenceColor(trace.confidence)} mr-3`}>
            {trace.confidence}%
          </span>
          <svg
            className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-purple-700 text-gray-700 dark:text-gray-200">
          <p className="mb-2">{trace.details}</p>
          {trace.url && trace.url !== '#' && (
            <a
              href={trace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-perceiveGold hover:underline text-sm"
            >
              View Source
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default TraceCard;