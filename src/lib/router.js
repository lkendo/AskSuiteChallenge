'use strict';

const Routes = function Routes() {
    this.alreadyRouted = {};
};

Routes.prototype.set = function (server, path) {
    const routes = require('require-all')(path);
    for (const version in routes) {
        const routeContainer = routes[version];
        for (const k in routeContainer) {
            if (k === 'routes') {
                const singleRoute = routes[version][k];
                this._addRoute(server, singleRoute);
            }
        }
    }
};

Routes.prototype._addRoute = function (server, route) {
    var name = server.name || 'default-name';
    this.alreadyRouted[name] = this.alreadyRouted[name] || [];
    for (var path in route) {
        var routePath = route[path];
        for (var method in routePath) {
            var action = routePath[method];
            method = method.toLowerCase();

            var key = method + ':' + path;

            if (this.alreadyRouted[name].indexOf(key) !== -1) {
                console.log('api:router', 'Route already added ' + path + ', skipping...');
            } else {
                try {
                    server[method](path, action);
                    this.alreadyRouted[name].push(key);
                    console.debug('api:router', 'Added route: ' + method.toUpperCase() + ' ' + path);
                } catch (e) {
                    console.log(e);
                    console.log('api:router', 'Adding route failed due errors: ' + method.toUpperCase() + ' ' + path);
                }
            }
        }
    }
};

module.exports = new Routes();
