
/**
 * Module dependencies.
 */

import fs from 'fs';
import io from 'socket.io-client';
import Logger from '~/client/lib/util/logger';

/**
 * Client
 */

export default class Client {

    /**
     * Constructor
     *
     * @param {Object} settings socket.ioのoptions
     */
    constructor(uri) {
        this.socket = io(uri, {
            autoConnect: false,
            transports: ['websocket'],
            multiplex: true,
            forceNew: true,
            reconnection: false
        });
    }

    /**
     * Set Socket.IO event.
     *
     * @param {string} eventsDirPath Directory path that specifies event of Socket.IO.
     */
    setEvent(eventsDirPath) {
        const logger = new Logger(this.socket);

        const fileList = fs.readdirSync(eventsDirPath);
        fileList.forEach(fileNameWithExtension => {
            // Remove extension
            var fileName = fileNameWithExtension.replace(/\.[a-zA-Z]*$/, '');

            // Register socket.io event
            const eventMap = require(eventsDirPath + '/' + fileName);
            Object.keys(eventMap).forEach((eventName) => {
                this.socket.on(eventName, (data) => {
                    logger.access(eventName, data);
                    eventMap[eventName](this.socket, data);
                });
            });
        });
    }
}
