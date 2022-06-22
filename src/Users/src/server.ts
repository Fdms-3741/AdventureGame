import http from 'http'
import logging from './logging';
import app from './app'
import config from './config'

const NAMESPACE = 'Server';

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));