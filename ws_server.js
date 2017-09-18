
/**
 * Module dependencies.
 */

import Server from 'socket.io';
import redis from 'socket.io-redis';

/**
 * WsServer
 */

export default class WsServer {

    /**
     * コンストラクタ socket.ioインスタンスを生成
     *
     * @param {http.Server} server
     * @param {Object} settings socket.ioのoptions
     */
    constructor(server, settings) {
        // socket.io Server instance
        this.io = new Server(server, {
            transports: settings.transports
        });
    }

    /**
     * redisを設定する
     *
     * @param {string} settings.host
     * @param {string|number} settings.port
     */
    setRedisAdapter(settings) {
        this.io.adapter(redis({host: settings.host, port: settings.port}));
    }

    /**
     * pub/sub用redisサーバーを取得
     *
     * @param {Array} redisWsServers
     * @param {string} wsGroup
     */
    static getRedisWsServer(redisWsServers = [], wsGroup = 'ws01') {
        const redisWsServer = redisWsServers.find(redisWsServer => {
            return redisWsServer.wsGroup === wsGroup;
        });

        if (!redisWsServer) {
            throw new Error('Not found redisWsServer');
        }
        return redisWsServer;
    }

    /**
     * イベントを設定する
     *
     * @param {Object} socket
     * @param {string} eventFilePath socket.ioのイベントを指定しているファイルパス
     */
    setEvent(socket, eventFilePath) {
        const eventMap = require('~' + eventFilePath);
        Object.keys(eventMap).forEach((eventName) => {
            socket.on(eventName, (data) => {
                eventMap[eventName](this.io, socket, data);
            });
        });
    }

    /**
     * コネクション接続時に呼ばれるミドルウェアを設定
     *
     * @param {function} fn(socket, callback) 設定するミドルウェア関数
     * @param {string} namespace 設定するネームスペース(デフォルトの値は`/`)
     */
    setSocketMiddleware(fn, namespace = '/') {
        this.io.of(namespace).use(fn);
    }
}
