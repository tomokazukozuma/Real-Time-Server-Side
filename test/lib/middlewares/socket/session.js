
/**
 * Module dependencies.
 */

import http from 'http';
import expect from 'expect.js';
import session from '~/lib/middlewares/socket/session';
import helper from '~/test/helper';

describe('Middleware Session Test',() => {
    it('正常: socket.requestにsessionオブジェクトが追加される',(callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.setSocketMiddleware(session, '/');
        wsServer.io.of('/').on('connect', (socket) => {
            expect(socket.request.session).to.an('object');
            callback();
        });

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.connect();
    });

    it('正常: セットしていない場合はsocket.requestにsessionオブジェクトが追加されない',(callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.io.of('/').on('connect', (socket) => {
            expect(socket.request.session).to.equal(undefined);
            callback();
        });

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.connect();
    });
});
