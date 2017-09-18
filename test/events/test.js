
/**
 * Server Events
 */

/**
 * test event hoge
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.hoge = (io, socket, data) => {
    socket.emit('hoge', data);
};

/**
 * test event join
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.join = (io, socket, data) => {
    socket.join(data.roomId);
    socket.to(data.roomId).emit('joined', 'OK');
};
