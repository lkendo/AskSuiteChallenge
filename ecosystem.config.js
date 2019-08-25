'use strict';

module.exports = {
    apps : [{
        name: 'Ask-Suite WebCrawler',
        script: 'src/api/server.js',
        instance_var: 'INSTANCE_ID',
        watch: true,
        node_args : ['--inspect=9228'],
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        }
    }]
};
