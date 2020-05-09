/*
** Script to determine the specific 
** environment configuration file (development.js, stage.js, production.js) 
** to use (i.e. to require).
*/

// check what environment info is passed in via the command line.
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// exports the specific configuration
const environmentConfigToUse = currentEnvironment.trim().length > 0 ? require(`../config/env/${currentEnvironment}`) : require('../config/env/development');

module.exports = environmentConfigToUse;
