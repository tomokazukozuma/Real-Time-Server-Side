
/**
 * Module dependencies.
 */

import http from 'http';
import expect from 'expect.js';
import session from '~/lib/middlewares/socket/session';
import authentication from '~/lib/middlewares/socket/authentication';
import helper from '~/test/helper';

describe('Middleware Authentication Test',() => {
    it('正常: sessionにuserIdが入っているので認証', (callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.setSocketMiddleware(session, '/');
        // テスト用にでuserIdをsession入れておく
        wsServer.setSocketMiddleware((socket, callback) => {
            socket.request.session.userId = 1;
            callback();
        }, '/');
        wsServer.setSocketMiddleware(authentication, '/');

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.on('connect', () => {
            // 認証が通ってconnectが呼ばれればOK
            expect().to.equal();
            callback();
        });
        socket.connect();
    });

    it('正常: sessionミドルウェアをセットしていない場合エラーになる', (callback) => {
        const server = http.Server();
        const address = server.listen().address();
        const wsServer = helper.createWsServer(server);
        wsServer.setSocketMiddleware(authentication, '/');

        const socket = helper.createSocketIoClient(address.port, '/');
        socket.on('error', (data) => {
            expect(data).to.equal('Authentication Failed');
            callback();
        });
        socket.connect();
    });
});
