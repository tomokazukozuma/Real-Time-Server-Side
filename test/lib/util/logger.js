
// Registers a server config directory.
process.env.NODE_CONFIG_DIR = process.cwd() +'/config/server';

/**
 * Module dependencies.
 */

import expect from 'expect.js';
import Logger from '~/lib/util/logger';

describe('Logger Test',() => {
    describe('constructor()',() => {
        it('引数がない場合、初期値("-")がsokcetIdとuserIdにセットされる',() => {
            const logger = new Logger();
            expect(logger.socketId).to.a('string');
            expect(logger.userId).to.a('string');
        });

        it('引数がある場合sokcetIdとuserIdにセットされる',() => {
            const socket = {
                id: 'abcdefg',
                session: {
                    userId: 1
                }
            };
            const logger = new Logger(socket);
            expect(logger.socketId).to.a('string');
            expect(logger.userId).to.a('number');
        });
    });
});
