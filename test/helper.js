
/**
 * Module dependencies.
 */

import config from 'config';
import ioc from 'socket.io-client';
import WsServer from '../ws_server';

const wsServerConfig = config.get('wsServer');

/**
 * socket.io-clientのインスタンスを生成
 *
 * @param {number|string} port
 * @param {string} namespace
 */
function createSocketIoClient(port, namespace = '/', options = {}) {
    return ioc('ws://localhost:' + port + namespace, Object.assign(options, {
        autoConnect: false,
        transports: wsServerConfig.transports,
        multiplex: true,
        forceNew: true,
        reconnection: false
    }));
}

/**
 * websocketサーバーを作成
 *
 * @param {http.Server} server
 */
function createWsServer(server) {
    return new WsServer(server, {
        transports: wsServerConfig.transports
    });
}

export default {
    createSocketIoClient,
    createWsServer
};
