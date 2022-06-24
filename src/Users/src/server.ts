import http from 'http'
import logging from './logging';
import app from './app'
import config from './config'

const NAMESPACE = 'Server';

const server = app.listen(config.server.port);