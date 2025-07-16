import React, { useState } from 'react';
import ConfidenceMeter from './ConfidenceMeter';
import TraceCard from './TraceCard';
import FeedbackForm from './FeedbackForm';

function SlidePanel({ report, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'trust' or 'feedback'

  if (!isOpen || !report) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      {/* Panel */}
      <section
        className={`absolute inset-y-0 right-0 pl-10 max-w-full flex transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-labelledby="slide-over-title"
      >
        <div className="w-screen max-w-2xl">
          <div className="h-full flex flex-col bg-white dark:bg-[#3F1470] shadow-xl">
            <div className="px-4 sm:px-6 py-6 border-b border-gray-200 dark:border-purple-800 flex justify-between items-center">
              <h2 id="slide-over-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {report.title}
              </h2>
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-perceiveGold"
                onClick={onClose}
              >
                <span className="sr-only">Close panel</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-purple-800">
              <button
                className={`py-3 px-6 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'summary'
                    ? 'border-b-2 border-perceiveGold text-perceiveGold dark:text-perceiveGold'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
                onClick={() => setActiveTab('summary')}
              >
                Report Summary
              </button>
              <button
                className={`py-3 px-6 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'trust'
                    ? 'border-b-2 border-perceiveGold text-perceiveGold dark:text-perceiveGold'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
                onClick={() => setActiveTab('trust')}
              >
                Why We Trust This
              </button>
              <button
                className={`py-3 px-6 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'feedback'
                    ? 'border-b-2 border-perceiveGold text-perceiveGold dark:text-perceiveGold'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
                onClick={() => setActiveTab('feedback')}
              >
                Feedback
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              {activeTab === 'summary' && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Summary</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">{report.summary}</p>

                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Confidence Meter</h3>
                  <div className="flex justify-center mb-6">
                    <ConfidenceMeter score={report.confidenceScore} />
                  </div>
                </div>
              )}

              {activeTab === 'trust' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Source Traceability</h3>
                  {report.trace && report.trace.length > 0 ? (
                    <div className="space-y-4">
                      {report.trace.map((traceItem) => (
                        <TraceCard key={traceItem.id} trace={traceItem} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">No detailed source trace available for this report.</p>
                  )}
                </div>
              )}

              {activeTab === 'feedback' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Provide Feedback</h3>
                  <FeedbackForm reportId={report.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SlidePanel;