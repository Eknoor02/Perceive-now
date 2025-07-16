import React from 'react';

function ReportCard({ report, onClick }) {
  const getConfidenceColor = (score) => {
    if (score > 90) return 'text-green-600 dark:text-green-400';
    if (score > 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div
      className="bg-white dark:bg-[#2A0F49] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-6 flex flex-col justify-between"
      onClick={onClick}
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{report.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-semibold">Type:</span> {report.reportType} | <span className="font-semibold">Industry:</span> {report.industry}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-base line-clamp-3 mb-4">{report.summary}</p>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span className="font-semibold text-gray-800 dark:text-gray-100 mr-2">Confidence:</span>
          <span className={`text-lg font-bold ${getConfidenceColor(report.confidenceScore)}`}>
            {report.confidenceScore}%
          </span>
        </div>
        <button className="px-4 py-2 bg-perceiveGold text-perceivePurple rounded-md font-semibold hover:bg-opacity-90 transition-opacity">
          View Report
        </button>
      </div>
    </div>
  );
}

export default ReportCard;