
// Registers a server config directory.
process.env.NODE_CONFIG_DIR = process.cwd() +'/client/config';

/**
 * Module dependencies.
 */

const config = require('config'); // TODO node-configのバグっぽい。requireじゃないと一番上で書き換えた環境変数が適用されない
import log4js from 'log4js';

/**
 * Logger
 */

export default class Logger {

	/**
     * コンストラクタ
     *
     * @param {Object} socket
     */
    constructor(socket = {}) {
        log4js.configure(config.get('logger'));
        this.socketId = socket.id || '-';
        this.userId = socket.session ? socket.session.userId : '-';
    }

    /**
     * アクセスログを生成
     *
     * @param {string} event
     * @param {Object} data
     */
    access(event, data = '-') {
        log4js.getLogger('access').info(`[pid:${process.pid},socketId:${this.socketId},userId:${this.userId},event:${event}] data:${data}`);
    }
}
