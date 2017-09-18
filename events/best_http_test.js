
/**
 * Server Events
 */

/**
 * Join room.
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.c2s_join = (io, socket, data) => {
    socket.join(data.roomName);

    // .nspをつけると自分自身にもイベントを送信できる
    socket.nsp.to(data.roomName).emit('s2c_join', data);
};

/**
 * Client to Server message event
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.c2s_msg = (io, socket, data) => {
    // .nspをつけると自分自身にもイベントを送信できる
    socket.nsp.to(data.roomName).emit('s2c_msg', data);
};

/**
 * Leave event
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.leave = (io, socket, data) => {
    // .nspをつけると自分自身にもイベントを送信できる
    socket.nsp.to(data.roomName).emit('s2c_leave', data);
    socket.leave(data.roomName);
};
