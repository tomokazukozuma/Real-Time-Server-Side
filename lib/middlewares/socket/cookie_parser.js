
/**
 * Module dependencies.
 */

import cookieParser from 'cookie-parser';


/**
 * Cookie Parser Middleware
 *
 * @param {Object} socket
 * @param {function} callback
 */
export default (socket, callback) => {
    cookieParser()(socket.request, {}, callback);
};
