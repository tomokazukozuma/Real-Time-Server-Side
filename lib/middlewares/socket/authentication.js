
/**
 * Module dependencies.
 */

/**
 * 認証ミドルウェア
 *
 * @param {Object} socket
 * @param {function} callback
 */
export default (socket, callback) => {
    // TODO どのkeyでユーザーの認証を完了とするかは今後変更してください
    if (!socket.request.session || !socket.request.session.userId) {
        callback(new Error('Authentication Failed'));
        return;
    }
    callback();
};
