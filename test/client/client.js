
/**
 * Module dependencies.
 */

import http from 'http';
import config from 'config';
import expect from 'expect.js';
import Client from '../../client/client';
import helper from '../helper';

function createClient(port, namespace = '/') {
    return new Client('http://localhost:' + port + namespace);
}

const wsServerConfig = config.get('wsServer');

describe('Client Test',() => {

    describe('constructor()',() => {
        it('正常: socketオブジェクトがセットされる',() => {
            const client = new Client('http://localhost');
            expect(client.socket).to.an('object');
        });

        it('正常: 引数がない場合はエラー',() => {
            expect(Client).withArgs().to.throwError();
        });
    });

    describe('setEvent()',() => {
        it('正常: イベントの送受信ができる',(callback) => {
            const server = http.Server();
            const address = server.listen().address();
            const wsServer = helper.createWsServer(server);
            wsServer.io.of('/test').on('connect', (socket) => {
                wsServer.setEvent(socket, wsServerConfig.eventsDirPath + '/test');
            });
            wsServer.io.of('/test').on('connect', (socket) => {
                socket.on('fuga', (data) => {
                    expect(data).to.equal('hoge');
                    callback();
                });
                socket.emit('fuga', 'hoge');
            });

            const client = createClient(address.port, '/test');
            client.setEvent(process.cwd() + '/test/client/events');
            client.socket.connect();
        });

        it('異常: 引数がない場合はエラー',() => {
            const server = http.Server();
            const address = server.listen().address();
            helper.createWsServer(server);

            const client = createClient(address.port, '/test');
            expect(client.setEvent).withArgs().to.throwError();
        });
    });
});