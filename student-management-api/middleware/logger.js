// Custom logger middleware
// Logs request method, URL, and current time

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleString();

  console.log(`[${time}] ${method} ${url}`);
  next();
};

module.exports = logger;
