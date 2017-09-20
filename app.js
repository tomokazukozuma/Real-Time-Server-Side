
/**
 * Module dependencies.
 */

import fs from 'fs';
import http from 'http';
import express from'express';
import program from 'commander';
import config from 'config';
import WsServer from '~/ws_server';


program
    .option('-p, --port [port]', 'Listening port')
    .parse(process.argv);


/**
 * Middlewares.
 */

import logger from '~/lib/middlewares/socket/logger';
import cookieParser from '~/lib/middlewares/socket/cookie_parser';
import session from '~/lib/middlewares/socket/session';
import authentication from '~/lib/middlewares/socket/authentication';


/**
 * HTTP Server Settings.
 */

const app = express();

app.get('/health_check', (request, response) => {
    response.send('ok');
});


/**
 * WsServer Settings.
 */

const server = http.Server(app);
const wsServerConfig = config.get('wsServer');

const wsServer = new WsServer(server, {
    transports: wsServerConfig.transports
});

// Redis setting is used only for Pub / Sub.s
const redisWsServer = WsServer.getRedisWsServer(config.get('datastore.redisWsServers'), process.env['WsGroup']);
wsServer.setRedisAdapter({
    host: redisWsServer.host,
    port: redisWsServer.port
});

wsServer.setSocketMiddleware(cookieParser, '/');
wsServer.setSocketMiddleware(session, '/');
// Used when authentication is required.
// wsServer.setSocketMiddleware(authentication, '/');

fs.readdirSync(process.cwd() + wsServerConfig.eventsDirPath)
.forEach(fileNameWithExtension => {
    // Remove extension
    const fileName = fileNameWithExtension.replace(/\.[a-zA-Z]*$/, '');
    const namespace = fileName === 'index' ? '/' : '/' + fileName;

    wsServer.setSocketMiddleware(logger, namespace);

    wsServer.io
    .of(namespace)
    .on('connect', (socket) => {
        // connect log
        socket.logger.access('connect ' + namespace, '-');

        // event log
        socket.use((packet, callback) => {
            socket.logger.access(packet[0], packet[1]);
            callback();
        });

        wsServer.setEvent(socket, wsServerConfig.eventsDirPath + '/' + fileName);
    });
});

server.listen(program.port || wsServerConfig.port);
