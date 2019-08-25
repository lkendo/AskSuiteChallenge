'use strict';

const restify = require('restify');
const config = require('config');
const router = require('../lib/router');

const server = restify.createServer();


server.use(restify.plugins.queryParser({ mapParams: true, overrideParams: true }));

const start = function start() {

    router.set(server, __dirname);
    const port = config.get('api.server.port');

    server.listen(port, () => {
        console.log('api', 'API Server started @ ' + port);
    });
};

start();
