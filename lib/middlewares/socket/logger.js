
/**
 * Module dependencies.
 */

import Logger from '~/lib/util/logger';

/**
 * ロガーミドルウェア
 *
 * @param {Object} socket
 * @param {function} callback
 */
export default (socket, callback) => {
    socket.logger = new Logger(socket);
    callback();
};
