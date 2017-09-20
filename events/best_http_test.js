
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

    // With .nsp you can also send an event to yourself
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
    // With .nsp you can also send an event to yourself
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
    // With .nsp you can also send an event to yourself
    socket.nsp.to(data.roomName).emit('s2c_leave', data);
    socket.leave(data.roomName);
};
