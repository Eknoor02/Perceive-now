import React, { useState } from 'react';

function FeedbackForm({ reportId }) {
  const [userComment, setUserComment] = useState('');
  const [flaggedSection, setFlaggedSection] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsError(false); // Reset error state

    if (!userComment) {
      setIsError(true);
      setMessage('Please enter your feedback.');
      return;
    }

    const feedbackData = {
      reportId,
      userComment,
      flaggedSection,
    };

    try {
      // Add the hardcoded viewer token for authentication
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.viewer_token';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the Authorization header
      };

      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: headers, // Use the updated headers object
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming success, you might want to show a success message
      setMessage('Feedback submitted successfully!');
      setUserComment('');
      setFlaggedSection('');
    } catch (error) {
      setIsError(true);
      setMessage(`Failed to submit feedback: ${error.message}. Please try again.`);
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#2A0F49] rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Submit Feedback</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userComment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Comments:</label>
          <textarea
            id="userComment"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-perceiveGold focus:border-perceiveGold"
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="flaggedSection" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Flagged Section (Optional):</label>
          <input
            type="text"
            id="flaggedSection"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-perceiveGold focus:border-perceiveGold"
            value={flaggedSection}
            onChange={(e) => setFlaggedSection(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-perceiveGold text-[#3F1470] font-bold py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-perceiveGold focus:ring-offset-2"
        >
          Submit Feedback
        </button>
        {message && (
          <p className={`mt-3 text-sm font-medium ${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default FeedbackForm;