
/**
 * Module dependencies.
 */

import config from 'config';
import log4js from 'log4js';
import cluster from 'cluster';

/**
 * Logger
 */

export default class Logger {

    /**
     * Constructor
     *
     * @param {Object} socket
     */
    constructor(socket = {}) {
        if (cluster.isMaster) {
            log4js.configure(config.get('logger.master'));
        } else if (cluster.isWorker) {
            log4js.configure(config.get('logger.worker'));
        }
        this.socketId = socket.id || '-';
        this.userId = socket.session ? socket.session.userId : '-';
    }

    /**
     * Generate Access Log
     *
     * @param {string} event
     * @param {Object} data
     */
    access(event, data) {
        log4js.getLogger('access').info(`[pid:${process.pid},socketId:${this.socketId},userId:${this.userId},event:${event}] data:${JSON.stringify(data)}`);
    }
}
