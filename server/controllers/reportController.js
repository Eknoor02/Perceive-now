const reports = require('../data/mockReports.json'); // Your mock data

exports.getReports = (req, res) => {
  // In a real app, you'd fetch from a DB and apply filters
  res.json(reports);
};

exports.submitFeedback = (req, res) => {
  const { reportId, userComment, flaggedSection } = req.body; // [cite: 23]

  if (!reportId || !userComment) {
    return res.status(400).json({ message: 'reportId and userComment are required.' });
  }

  // In a real application, you would save this feedback to a database.
  // For this prototype, we'll just log it to the console. [cite: 23]
  console.log('--- New Feedback Submitted ---');
  console.log(`Report ID: ${reportId}`);
  console.log(`User Comment: "${userComment}"`);
  console.log(`Flagged Section: ${flaggedSection || 'N/A'}`);
  console.log('------------------------------');

  res.status(200).json({ message: 'Feedback received successfully!', receivedData: { reportId, userComment, flaggedSection } });
};