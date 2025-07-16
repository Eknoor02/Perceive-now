import React, { useState, useEffect, useCallback } from 'react';
import ReportCard from '../components/ReportCard';
import SlidePanel from '../components/SlidePanel';

function ReportViewer() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Filter states
  const [reportTypeFilter, setReportTypeFilter] = useState('All');
  const [confidenceScoreFilter, setConfidenceScoreFilter] = useState(0); // Min score
  const [industryFilter, setIndustryFilter] = useState('All');

  // Fetch reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.viewer_token'; // Hardcoded viewer token
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await fetch('http://localhost:5000/api/reports', { headers });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReports(data);
        setFilteredReports(data); // Initialize filtered reports with all reports
      } catch (error) {
        console.error("Error fetching reports:", error);
        // Handle error, e.g., show an error message in the UI
      }
    };
    fetchReports();
  }, []); // Dependency array ensures it runs once on mount

  // Apply filters whenever filter states or original reports change
  useEffect(() => {
    let currentFiltered = reports;

    if (reportTypeFilter !== 'All') {
      currentFiltered = currentFiltered.filter(report => report.reportType === reportTypeFilter);
    }

    if (industryFilter !== 'All') {
      currentFiltered = currentFiltered.filter(report => report.industry === industryFilter);
    }

    currentFiltered = currentFiltered.filter(report => report.confidenceScore >= confidenceScoreFilter);

    setFilteredReports(currentFiltered);
  }, [reports, reportTypeFilter, confidenceScoreFilter, industryFilter]);

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setIsPanelOpen(true);
  };

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedReport(null);
  }, []);

  // Get unique filter options from reports
  const uniqueReportTypes = ['All', ...new Set(reports.map(r => r.reportType))];
  const uniqueIndustries = ['All', ...new Set(reports.map(r => r.industry))];

  return (
    <div className="relative">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Report Overview</h2>

      {/* Filters Section */}
      <div className="bg-white dark:bg-[#2A0F49] p-6 rounded-lg shadow-md mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Report Type</label>
          <select
            id="reportType"
            className="mt-1 block w-48 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-perceiveGold focus:border-perceiveGold sm:text-sm text-gray-900 dark:text-gray-200"
            value={reportTypeFilter}
            onChange={(e) => setReportTypeFilter(e.target.value)}
          >
            {uniqueReportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry</label>
          <select
            id="industry"
            className="mt-1 block w-48 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-perceiveGold focus:border-perceiveGold sm:text-sm text-gray-900 dark:text-gray-200"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            {uniqueIndustries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="confidence" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Confidence Score: {confidenceScoreFilter}%</label>
          <input
            type="range"
            id="confidence"
            min="0"
            max="100"
            value={confidenceScoreFilter}
            onChange={(e) => setConfidenceScoreFilter(Number(e.target.value))}
            className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700 accent-perceiveGold"
          />
        </div>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <ReportCard key={report.id} report={report} onClick={() => handleReportClick(report)} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-300 text-lg">No reports match your filters.</p>
        )}
      </div>

      {/* Slide-out Panel */}
      <SlidePanel
        report={selectedReport}
        isOpen={isPanelOpen}
        onClose={closePanel}
      />
    </div>
  );
}

export default ReportViewer;