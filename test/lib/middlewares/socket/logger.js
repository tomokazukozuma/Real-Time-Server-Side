
/**
 * Module dependencies.
 */

import http from 'http';
import expect from 'expect.js';
import logger from '~/lib/middlewares/socket/logger';
import helper from '~/test/helper';

describe('Middleware Logger Test',() => {
    it('正常: socketにloggerオブジェクトが追加される',(callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.setSocketMiddleware(logger, '/');
        wsServer.io.of('/').on('connect', (socket) => {
            expect(socket.logger).to.an('object');
            callback();
        });

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.connect();
    });

    it('正常: セットしていない場合はsocketにloggerオブジェクトが追加されない',(callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.io.of('/').on('connect', (socket) => {
            expect(socket.logger).to.equal(undefined);
            callback();
        });

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.connect();
    });
});
