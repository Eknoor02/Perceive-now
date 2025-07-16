const { v4: uuidv4 } = require('uuid'); // For generating UUIDs 

// Middleware to add a UUID trace header 
const uuidTraceMiddleware = (req, res, next) => {
  const traceId = uuidv4(); // Generate a unique ID for each request
  req.headers['X-Trace-ID'] = traceId; // Add it to the request headers (can be accessed later)
  res.setHeader('X-Trace-ID', traceId); // Add it to the response headers 
  next();
};

// Middleware to log request latency 
const requestLogger = (req, res, next) => {
  const start = process.hrtime(); // High-resolution real time

  res.on('finish', () => {
    const end = process.hrtime(start);
    const duration = (end[0] * 1000 + end[1] / 1000000).toFixed(2); // Convert to milliseconds 
    const traceId = res.getHeader('X-Trace-ID') || 'N/A'; // Get trace ID from response header

    console.log(`[${traceId}] ${req.method} ${req.originalUrl} - ${duration}ms`); // Log method, URL, and latency 
  });

  next();
};

module.exports = {
  uuidTraceMiddleware,
  requestLogger
};