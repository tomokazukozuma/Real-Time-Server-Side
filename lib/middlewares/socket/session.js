
/**
 * Module dependencies.
 */

import config from 'config';
import session from 'express-session';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);
const redisSessionServerConfig = config.get('datastore.redisSessionServer');

/**
 * セッションミドルウェア
 *
 * @param {Object} socket
 * @param {function} callback
 */
export default (socket, callback) => {
    session({
        store: new RedisStore({host: redisSessionServerConfig.host, port: redisSessionServerConfig.port}),
        secret: 'keyboard cat', // TODO PHP側と揃える
        resave: false,
        saveUninitialized: true
    })(socket.request, {}, callback);
};
