const Hapi = require('@hapi/hapi');
const routes = require('./routes');

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });

    server.route(routes);  

    server.ext('onPreResponse', function (request, h) {
        return h.continue;
    });
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();
