
/**
 * Module dependencies.
 */

import Logger from '~/lib/util/logger';

/**
 * Logger Middleware
 *
 * @param {Object} socket
 * @param {function} callback
 */
export default (socket, callback) => {
    socket.logger = new Logger(socket);
    callback();
};
