import rateLimit from 'express-rate-limit';

const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

export default requestLimiter;
