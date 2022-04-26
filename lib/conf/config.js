const path = require('path');
const logger = require ('../base/lib/service/loggerService');

module.exports = (basePath) => {

    require('dotenv').config({ path: path.join( basePath, 'conf','.env') });

    logger.info("[example][config]: creating config object");

    return {
        routes: {
            testing: {
                testingRouteStatus: (process.env.api_NODE_ENABLE_TESTING || 'enabled').toLowerCase()
            }
        }
    };
};
