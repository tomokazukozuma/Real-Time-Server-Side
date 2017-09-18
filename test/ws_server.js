
/**
 * Module dependencies.
 */

import http from 'http';
import config from 'config';
import expect from 'expect.js';
import WsServer from '~/ws_server';
import helper from '~/test/helper';

const wsServerConfig = config.get('wsServer');

describe('WsServer Test',() => {

    describe('constructor()',() => {
        it('正常: ioオブジェクトがセットされる',() => {
            const server = http.Server();
            const wsServer = new WsServer(server, {
                transports: wsServerConfig.transports
            });
            expect(wsServer.io).to.an('object');
        });

        it('正常: settings引数がない場合はエラー',() => {
            const fn = () => {
                const server = http.Server();
                new WsServer(server);
            };
            expect(fn).to.throwError();
        });
    });

    describe('setRedisAdapter()',() => {
        it('正常: 別プロセスのイベントが呼ばれる',(callback) => {
            const redisWsServerConfig = {host: 'localhost', port: '6379'};

            const server1 = http.Server();
            const address1 = server1.listen().address();
            const wsServer1 = helper.createWsServer(server1);
            wsServer1.setRedisAdapter(redisWsServerConfig);
            wsServer1.io.of('/test').on('connect', (socket) => {
                wsServer1.setEvent(socket, wsServerConfig.eventsDirPath + '/test');
            });
            const socket1 = helper.createSocketIoClient(address1.port, '/test');
            socket1.on('connect', () => {
                socket1.emit('join', {roomId: 1});
                socket1.on('joined', (data) => {
                    expect(data).to.equal('OK');
                    callback();
                });
            });
            socket1.connect();

            const server2 = http.Server();
            const address2 = server2.listen().address();
            const wsServer2 = helper.createWsServer(server2);
            wsServer2.setRedisAdapter(redisWsServerConfig);
            wsServer2.io.of('/test').on('connect', (socket) => {
                wsServer2.setEvent(socket, wsServerConfig.eventsDirPath + '/test');
            });
            const socket2 = helper.createSocketIoClient(address2.port, '/test');
            socket2.on('connect', () => {
                socket2.emit('join', {roomId: 1});
            });
            socket2.connect();
        });
    });

    describe('getRedisWsServer()',() => {
        const redisWsServers = [
            {
                wsGroup: 'ws01',
                host: '127.0.0.1',
                port: 3001
            },
            {
                wsGroup: 'ws02',
                host: '127.0.0.1',
                port: 3002
            }
        ];

        it('正常: WsGroupに合うredisWsServer情報を返す',() => {
            const redisWsServer = WsServer.getRedisWsServer(redisWsServers, 'ws02');
            expect(redisWsServer).to.equal(redisWsServers[1]);
        });

        it('正常: WsGroupを指定しない場合はデフォルト値に合うredisWsServer情報を返す',() => {
            const redisWsServer = WsServer.getRedisWsServer(redisWsServers);
            expect(redisWsServer).to.equal(redisWsServers[0]);
        });

        it('異常: WsGroupに合うredisWsServer情報がない場合はエラーとなる',() => {
            expect(WsServer.getRedisWsServer).withArgs(redisWsServers, 'ws03').to.throwError();
        });

        it('異常: 引数がない場合はエラー',() => {
            expect(WsServer.getRedisWsServer).withArgs().to.throwError();
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
            const socket = helper.createSocketIoClient(address.port, '/test');
            socket.on('connect', () => {
                socket.on('hoge', (data) => {
                    expect(data).to.equal('fuga');
                    callback();
                });
                socket.emit('hoge', 'fuga');
            });
            socket.connect();
        });

        it('異常: 引数がない場合はエラー',() => {
            const wsServer = helper.createWsServer();
            expect(wsServer.setEvent).withArgs().to.throwError();
        });
    });

    describe('setSocketMiddleware()',() => {
        it('正常: namespace:"/"にミドルウェアをセット',(callback) => {
            const server = http.Server();
            const address = server.listen().address();
            const wsServer = helper.createWsServer(server);
            wsServer.setSocketMiddleware((socket) => {
                expect(socket).to.an('object');
                callback();
            }, '/');
            const socket = helper.createSocketIoClient(address.port, '/');
            socket.connect();
        });

        it('正常: namespace:"/test"にミドルウェアをセット',(callback) => {
            const server = http.Server();
            const address = server.listen().address();
            const wsServer = helper.createWsServer(server);
            wsServer.setSocketMiddleware((socket) => {
                expect(socket).to.an('object');
                callback();
            }, '/test');
            const socket = helper.createSocketIoClient(address.port, '/test');
            socket.connect();
        });

        it('正常: namespaceを指定しない場合は`/`になる',(callback) => {
            const server = http.Server();
            const address = server.listen().address();
            const wsServer = helper.createWsServer(server);
            wsServer.setSocketMiddleware((socket) => {
                expect(socket).to.an('object');
                callback();
            });
            const socket = helper.createSocketIoClient(address.port);
            socket.connect();
        });
    });
});
