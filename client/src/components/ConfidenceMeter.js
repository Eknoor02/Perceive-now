import React from 'react';

function ConfidenceMeter({ score }) {
  // Ensure score is within 0-100
  const normalizedScore = Math.max(0, Math.min(100, score));

  // Determine color based on score (Tailwind classes)
  let barColorClass = 'bg-red-500'; // Default for low score
  if (normalizedScore > 90) {
    barColorClass = 'bg-green-500';
  } else if (normalizedScore > 75) {
    barColorClass = 'bg-yellow-500';
  } else if (normalizedScore > 50) {
    barColorClass = 'bg-orange-500';
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barColorClass}`}
          style={{ width: `${normalizedScore}%` }}
        ></div>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800 dark:text-gray-100">
          {normalizedScore}% Confidence
        </span>
      </div>
    </div>
  );
}

export default ConfidenceMeter;