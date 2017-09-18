
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
exports.room_join = (io, socket, data) => {
    socket.join(data.roomId);

    // `clients` is an array containing all connected socket ids
    io.of('/gvg').in(data.roomId).clients((err, clients) => {
        // .nspをつけると自分自身にもイベントを送信できる
        socket.nsp.to(data.roomId).emit('room_member', clients);
    });
};

/**
 * GvG action.
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.action = (io, socket, data) => {
    // .nspをつけると自分自身にもイベントを送信できる
    socket.nsp.to(data.roomId).emit('action', data);
};

/**
 * Disconnect event called when webcoket connection is broken.
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.disconnect = (io, socket, data) => {

};

/**
 * Error event.
 *
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} data
 */
exports.error = (io, socket, data) => {

};
