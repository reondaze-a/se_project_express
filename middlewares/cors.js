const ALLOWED = new Set([
  'https://whattowear.strangled.net',
  'https://www.whattowear.strangled.net',
  'http://localhost:5173',
]);


const corsOpts = {
  origin(origin, cb) { return (!origin || ALLOWED.has(origin)) ? cb(null, true) : cb(new Error('Not allowed by CORS')); },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD'],
  allowedHeaders: ['Authorization','Content-Type'],
  credentials: false,
  maxAge: 86400,
};

module.exports = { corsOpts };