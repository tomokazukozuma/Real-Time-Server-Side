
/**
 * Module dependencies.
 */

import http from 'http';
import expect from 'expect.js';
import cookieParser from '~/lib/middlewares/socket/cookie_parser';
import helper from '~/test/helper';

describe('Middleware CookieParser Test',() => {
    it('正常: クライアントの接続時にcookieがセットされていない場合は空オブジェクト',(callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.setSocketMiddleware(cookieParser, '/');
        wsServer.io.of('/').on('connect', (socket) => {
            expect(socket.request.cookies).to.eql({});
            callback();
        });

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.connect();
    });

    it('正常: クライアントの接続時にcookieをセットするとパースされる',(callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.setSocketMiddleware(cookieParser, '/');
        wsServer.io.of('/').on('connect', (socket) => {
            expect(socket.request.cookies).to.eql({foo:'bar', bar:'baz'});
            callback();
        });

        const socket = helper.createSocketIoClient(address.port, '/', {extraHeaders: {Cookie: 'foo=bar; bar=baz'}});
        socket.connect();
    });

    it('正常: cookiePaserを読んでない場合はundefined',(callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.io.of('/').on('connect', (socket) => {
            expect(socket.request.cookies).to.equal(undefined);
            callback();
        });

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.connect();
    });
});
