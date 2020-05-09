const arangojs = require('arangojs');
const config = require('../lib/selector-env');

const db = {};

// public methods
// db.connect = () => {
    
//     const _input = config.services.datastores.filter( item => {
    
//         if( item.name === 'api-JAS' ){
//             return item;
//         }
//     })
    
//     let _length = 0;
//     if( _input.length > 0){
//         _indexToUse = _input.length - 1;
//     }
//     return connectToDataStore(_input[_indexToUse]);
// }

// private functions
connectToDataStore = (params) => {
    // connect to the default arangodb url
    // i.e. http://localhost:8529
    // const db = new arangojs.Database('http://zulu-db-d01.southeastasia.cloudapp.azure.com:8529');

    const _db =  (typeof(params) != 'undefined') && (typeof(params.config) !== 'undefined') && (typeof(params.config.url) != 'undefined') ? new arangojs.Database(params.config.url) : new arangojs.Database('http://localhost:8529');
    const _userid = params.config.userid;
    const _password = params.config.password;
    const _dbName = params.config.dbName;

    // authenticate with the arangodb at this url
    return _db.login(_userid, _password)
    .then((jwtReturned) => {
        // login successful

        // cache the jwt
        const jwt = jwtReturned;
        
        // use a specific database that the authenticated user
        // has authorization to access
        const _rtn = {};
        _rtn.ok = true;
        _rtn.tag = params.tag;
        _rtn.database = _db.useDatabase(_dbName);

        return _rtn;
    } )
    
}

// execute

// const _input = {
//     url : 'http://localhost:8529',
//     userid : 'zulu',
//     password : 'Zu1u',
//     dbName : 'JAS'
// }

// datastore configurations for application system
const _input = config.services.datastores.filter( item => {
    
    if( item.name === 'api-JAS' ){
        return item;
    }
})

// datastore configurations for Security module
const _inputSecurity = config.services.datastores.filter( item => {

    if( item.name === 'api-Security'){
        return item;
    }
})

// mechanism to use the last datastore configuration
let _indexToUse = -1;
if ( _input.length > 0){
    _indexToUse = _input.length - 1;
}

let _configIndexToUseSecurity = -1;
if( _inputSecurity.length > 0){
    _configIndexToUseSecurity = _inputSecurity.length -1;
}

const _promisesToBeDone = [];

// connectToDataStore(_input[_indexToUse])
// .then( (database) => {
//     db.database = database;
// })

const _params = {};
_params.config = _input[_indexToUse];
_params.tag = 'db-app';
_promisesToBeDone.push(connectToDataStore(_params));

const _paramsSecurity = {};
_paramsSecurity.config = _inputSecurity[_configIndexToUseSecurity];
_paramsSecurity.tag = 'db-security';
_promisesToBeDone.push(connectToDataStore(_paramsSecurity));

Promise.all(_promisesToBeDone)
.then((outcome) => {
    // console.log(`outcome --> ${JSON.stringify(outcome)}`);
    
    // exceptions handling
    if(typeof(outcome) === 'undefined'){
        console.log(`API Service Startup - Failure`);
        console.log(`Fail to connect to configured DataStores.`);
        return false;
    }

    if( !Array.isArray(outcome) || ( Array.isArray(outcome) && outcome.length === 0)){
        // outcome return was not the expected Array data structure
        console.log(`API Service Startup - Failure`);
        console.log(`Fail to connect to configured DataStores.`);
        return false;
    }

    // ok.
    const _databases = {};

    outcome.forEach((item) => {
        // loop through each array element
        if( (item.ok)){
            // connection to configured datastore is successful.
            if( item.tag === 'db-app'){
                _databases.app = item.database;
            }

            if( item.tag === 'db-security'){
                _databases.security = item.database;
            }
        }

    })
    
    return db.databases = _databases;
    //
})
.catch((error) => {
    console.log(error);
})

module.exports = db;