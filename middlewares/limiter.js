const { rateLimit, ipKeyGenerator} = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
  handler: (req, res, next, options) => {
    res.status(options.statusCode || 429).json(
      typeof options.message === 'string' ? { message: options.message } : options.message
    );
  },
  keyGenerator: ipKeyGenerator
});

module.exports = { apiLimiter };
