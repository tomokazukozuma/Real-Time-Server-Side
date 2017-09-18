
/**
 * Module dependencies.
 */

import cookieParser from 'cookie-parser';


/**
 * cookieパーサーミドルウェア
 *
 * @param {Object} socket
 * @param {function} callback
 */
export default (socket, callback) => {
    cookieParser()(socket.request, {}, callback);
};
