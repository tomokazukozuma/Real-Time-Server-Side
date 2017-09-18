
// Registers a server config directory.
process.env.NODE_CONFIG_DIR = process.cwd() +'/client/config';

/**
 * Module dependencies.
 */

const config = require('config'); // TODO node-configのバグっぽい。requireじゃないと一番上で書き換えた環境変数が適用されない
import program from 'commander';
import Client from '~/client/client';

program
    .option('-p, --port [port]', 'Listening port')
    .option('-r, --room [roomId]', 'Room ID')
    .parse(process.argv);

const port = program.port || config.get('port');
const roomId = program.room || 1;
const queryParameter = roomId ? '?roomId=' + roomId : '';

const client = new Client(config.get('wsGroupUrls')[0] + ':' + port + '/gvg' + queryParameter);

client.socket.on('connect',() => {
    client.setEvent(process.cwd() + '/client/events');

    client.socket.emit('room_join', {roomId: roomId});

    function loop() {
        setTimeout(() => {
            client.socket.emit('action', {roomId: roomId, skillId: 1});
            loop();
        }, 2000);
    }
    // loop()
});

client.socket.connect();
