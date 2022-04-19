const path = require( 'path' );
const server = require('./lib/base/index');
const servers = server("lib/base");


const routes = {
    "testing_route": require ( path.join(__dirname, 'lib', 'routes', 'testing_route', 'testing_route-routes') )
}




// HTTP or HTTPS Routes
if (servers.expressApp != false) {

    servers.expressApp.use( '/testing', routes.testing_route.WebRouter(servers.baseConfig) )

}


// Socket-io Routes
if ( servers.socketioApp != false ) { servers.socketioApp.on('connection', (socket) => {

    socket.on('/testing', (data) => { routes.testing_route.IoRouter(socket, data, servers.baseConfig) });

})}
