/* eslint-disable import/first */
import 'reflect-metadata';
import '@service/polyfills';

require('dotenv').config();

import http from 'http';
import path from 'path';
import express from 'express';
import compression from 'compression';
import Container from 'typedi';
import SocketIO from 'socket.io';
import * as RoutingControllers from 'routing-controllers';
import Logger from '@service/infrastructure/logger';
import CommandRegistryService from '@service/domain/commands/registry/command-registry-service';
import AdminEventStream from '@service/event-stream/admin-event-stream';
import PlayerEventStream from '@service/event-stream/player-event-stream';
import Configuration from '@service/infrastructure/configuration';
import DatabaseClient from '@service/infrastructure/storage';

const logger = new Logger('app-init');

async function main(): Promise<void> {
  // Read configuration
  const config = Configuration.readFromEnv();
  Container.set(Configuration, config);

  // Create HTTP server
  RoutingControllers.useContainer(Container);
  const app = RoutingControllers.createExpressServer({
    controllers: [path.join(__dirname, 'api/**/*-controller.js')],
    classTransformer: false,
  });

  app.use(compression());
  app.use(express.static(path.join(__dirname, 'public'), { index: 'fm-player.html', extensions: ['html'] }));

  // Connect to database
  const storage = Container.get(DatabaseClient);
  await storage.connect();

  // Create WebSocket server
  const server: http.Server = new http.Server(app);
  const io = new SocketIO.Server(server, { serveClient: false });
  Container.set(SocketIO.Server, io);
  Container.get(PlayerEventStream);
  Container.get(AdminEventStream);

  // Initialize commands
  CommandRegistryService.detectProcessorModules();

  // Start server
  server.listen(config.PORT, () => logger.info(`LebkuchenFM service started on port ${config.PORT}`));
}

try {
  main();
} catch (err) {
  logger.withError(err as Error);
}
