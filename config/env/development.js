/*
** Development environment basic configurations
**
*/

const config = {};

config.http = {
    port : 3000
};

config.https = {
    port : 3001
};

// datastore configurations that will be used
// for the respective datastores to support this API server.
config.services = {
    
    datastores : [
            {
                name: 'api-JAS',
                type: 'arangodb',
                url : 'http://localhost:8529',
                userid : 'zulu',
                password : 'Zu1u',
                dbName : 'JAS'
            }
    ],

};

module.exports = config;