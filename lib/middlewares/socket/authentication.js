
/**
 * Module dependencies.
 */

/**
 * Authentication Middleware
 *
 * @param {Object} socket
 * @param {function} callback
 */
export default (socket, callback) => {
    // Please change which key to use for user authentication.
    if (!socket.request.session || !socket.request.session.userId) {
        callback(new Error('Authentication Failed'));
        return;
    }
    callback();
};
