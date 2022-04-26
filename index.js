const path = require( 'path' );
const server = require('./lib/base/index');
const servers = server("lib/base");
const logger = require ('./lib/base/lib/service/loggerService');
const configs = {
    baseConfigs: servers.baseConfig,
    projectConfigs: require('./lib/conf/config')('lib')
}

const routes = {
    "testing_route": require ( path.join(__dirname, 'lib', 'routes', 'testing_route', 'testing_route-routes') )
}




// HTTP or HTTPS Routes
if (servers.expressApp != false) {

    if (configs.projectConfigs.routes.testing.testingRouteStatus === 'enabled') {
        logger.info("[example][index][http]: enabling /testing web endpoint");
        servers.expressApp.use( '/testing', routes.testing_route.WebRouter(configs) )
    }

}


// Socket-io Routes
if ( servers.socketioApp != false ) { servers.socketioApp.on('connection', (socket) => {

    if (configs.projectConfigs.routes.testing.testingRouteStatus === 'enabled') {
        socket.on('/testing', (data) => { routes.testing_route.IoRouter(socket, data, configs) });
    }

})}
