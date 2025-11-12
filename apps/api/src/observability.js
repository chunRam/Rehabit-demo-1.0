const defaultLogger = {
  info: console.log,
  warn: console.warn,
  error: console.error,
};

const normalizeModule = (module) => module?.default ?? module;

export function createObservability({
  serviceName = 'rehabit-service',
  environment = process.env.NODE_ENV ?? 'development',
  logger = defaultLogger,
} = {}) {
  const state = {
    sentry: null,
    datadog: null,
  };

  const sentryDsn = process.env.SENTRY_DSN;
  if (sentryDsn) {
    import('@sentry/node')
      .then((module) => {
        const Sentry = normalizeModule(module);
        Sentry.init({
          dsn: sentryDsn,
          environment,
          tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 1.0),
        });
        state.sentry = Sentry;
        logger.info?.('[observability] Sentry initialised');
      })
      .catch((error) => {
        logger.warn?.('[observability] Failed to initialise Sentry SDK', error);
      });
  }

  const datadogUrl = process.env.DATADOG_AGENT_URL;
  if (datadogUrl) {
    import('dd-trace')
      .then((module) => {
        const ddTrace = normalizeModule(module);
        const tracer = ddTrace.init({
          service: serviceName,
          env: environment,
          url: datadogUrl,
          startupLogs: false,
        });
        state.datadog = {
          record: (name, durationMs, meta = {}) => {
            try {
              if (typeof tracer.trace === 'function') {
                tracer.trace(
                  name,
                  { resource: name, tags: { ...meta, 'duration.ms': durationMs } },
                  (span) => {
                    span?.finish?.();
                  },
                );
                return;
              }

              if (typeof tracer.startSpan === 'function') {
                const span = tracer.startSpan(name, { tags: { ...meta } });
                span?.setTag?.('duration.ms', durationMs);
                span?.finish?.();
                return;
              }
            } catch (error) {
              logger.warn?.('[observability] Failed to record Datadog span', error);
            }

            logger.info?.('[observability] performance span', {
              name,
              durationMs,
              ...meta,
            });
          },
        };
        logger.info?.('[observability] Datadog tracer initialised');
      })
      .catch((error) => {
        logger.warn?.('[observability] Failed to initialise Datadog tracer', error);
      });
  }

  const captureException = (error, context) => {
    if (state.sentry?.captureException) {
      state.sentry.captureException(error, context);
      return;
    }

    logger.error?.('[observability] captured exception', error, context);
  };

  const recordPerformance = (name, durationMs, meta = {}) => {
    if (Number.isFinite(durationMs) && state.datadog?.record) {
      state.datadog.record(name, durationMs, meta);
      return;
    }

    if (Number.isFinite(durationMs)) {
      logger.info?.('[observability] performance span', {
        name,
        durationMs,
        ...meta,
      });
    }
  };

  return {
    captureException,
    recordPerformance,
  };
}

export default createObservability;
