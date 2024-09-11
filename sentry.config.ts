import * as Sentry from "@sentry/gatsby";

export function StartSentry() {
  Sentry.init({
    dsn: "https://387b15a5897e55c39dbdd622edd91769@sentry.incubateur.net/179",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 0.2,
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NODE_ENV ? "production" : "development",
  });
  return null;
}
