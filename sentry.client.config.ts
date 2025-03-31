import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
});
