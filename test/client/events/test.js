
/**
 * test event hoge
 *
 * @param {Object} socket
 * @param {Object} data
 */
exports.fuga = (socket, data) => {
    socket.emit('fuga', data);
};

/**
 * test event joined
 *
 * @param {Object} socket
 * @param {Object} data
 */
exports.joined = (socket, data) => {

};
