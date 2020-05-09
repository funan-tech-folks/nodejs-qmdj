/*
** script to select the datastore to use
** depending on the NODE_ENV setting that is
** in use.
*/

// dependencies
const config = require('../lib/selector-env');
const datastores = require('../config/datastores');

// functions

const setupDatastore = (modelName)=>{
    
    // function to setup the datastore object

    // get the configured datastore name for the model (in the specific environment configuration file)
    const _dsName = typeof(config.datastores.models[modelName]) === 'string' ? config.datastores.models[modelName] : '';

    // get the datastore configuration object from the datastores configuration file
    const _dsConfig = typeof(datastores[_dsName] === 'object') ? datastores[_dsName] : {};

    const _dsType = ( (typeof(_dsConfig) == 'object') && (typeof(_dsConfig.type) == 'string' ) )? _dsConfig.type : '';

    // determin which datastore library to import (i.e. require)
    // the returned object, dsLib will have a type 'function'.
    //
    // Reminder
    // --------
    // need to refactor later to cater for other datastore type.
    const _dsLib = (_dsType == 'orientdb') ? require('orientjs') : {};
    const _server = ( typeof(_dsLib) == 'function' && (_dsLib.name == 'OrientDB')) ? _dsLib(_dsConfig.server) : {};
    
    
    const _ds = {};

    if ( typeof(_dsLib) == 'function' && (_dsLib.name == 'OrientDB')){
        // orientjs is imported;
        _ds.server = _server;
        _ds.database = _ds.server.use(_dsConfig.database);

    }
    
    return _ds;
}


/*
** Code execution 
*/
const datastoreToUse = {};

// execute a deep copy of the config object (thus making it 'immutable');
const configured = JSON.parse(JSON.stringify(config));

if( (typeof(config.datastores) === 'object') && (typeof(config.datastores.models) === 'object') ){

    
    if( (typeof(config.datastores.models.security) === 'string') ){
        // configToExport.datastores.models.security = setupDatastore('security');
        datastoreToUse.security = setupDatastore('security');
    }

    if( (typeof(config.datastores.models.api) === 'string') ){
        // configToExport.datastores.models.api = setupDatastore('api');
        datastoreToUse.api = setupDatastore('api');
    }
}

module.exports = datastoreToUse;