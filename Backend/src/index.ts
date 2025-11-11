import express from 'express';
import { MongoClient } from 'mongodb';
import pino from 'pino';

const PORT = parseInt(process.env.PORT || '4000', 10);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/ecom';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

async function createMongoClient() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client;
}

async function start() {
  const app = express();
  app.use(express.json());

  // Healthcheck
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Simple ping endpoint
  app.get('/api/ping', (_req, res) => {
    res.json({ message: 'pong' });
  });

  // MongoDB check
  app.get('/api/db-stats', async (_req, res) => {
    try {
      const client = await createMongoClient();
      const admin = client.db().admin();
      const info = await admin.serverStatus();
      await client.close();
      res.json({ ok: true, info: { version: info.version, connections: info.connections } });
    } catch (err: any) {
      logger.error({ err }, 'MongoDB stats error');
      res.status(500).json({ ok: false, error: err?.message || 'unknown error' });
    }
  });

  app.listen(PORT, () => {
    logger.info(`Backend listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error', err);
  process.exit(1);
});
