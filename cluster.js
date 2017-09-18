
/**
 * Module dependencies.
 */

import os from 'os';
import config from 'config';
import cluster from 'cluster';
import program from 'commander';
import Logger from '~/lib/util/logger';

program
    .option('-p, --port [port]', 'Listening port')
    .parse(process.argv);

const logger = new Logger();
const wsServerConfig = config.get('wsServer');
const clusterConfig = config.get('cluster');

cluster.setupMaster({
    exec: clusterConfig.exec,
    args: ['--port', program.port || wsServerConfig.port],
});

for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    logger.access('exit', {workerId: worker.id, code: code, signal: signal});
    cluster.fork();
});
