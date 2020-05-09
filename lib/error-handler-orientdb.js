/*
** Error Handler - OrientDB
*/

const handler = {};

handler.check = (error)=>{
    
    // anticipated errors
    if( error.name == 'OrientDB.ConnectionError [ENOTFOUND]'){
                
        // something is wrong with the orientdb server configuration settings.
        const _rtn = {};
        _rtn.ok = false;
        _rtn.msg = {};
        _rtn.msg.type = 'ZULU ERROR - ORIENTDB';
        _rtn.msg.message = 'Ooops! There is a problem with the Server Configuration passed in.';

        return _rtn;
    }

    if( error.type == 'com.orientechnologies.orient.core.exception.OConfigurationException'){
        
        // something is wrong with the orientdb database configuration settings.

        const _rtn = {};
        _rtn.ok = false;
        _rtn.msg = {};
        _rtn.msg.type = 'ZULU ERROR - ORIENTDB';
        _rtn.msg.message = 'Ooops! There is a problem with the Database Configuration passed in.';

        return _rtn;
    }

    if( error.type == 'com.orientechnologies.orient.core.exception.OQueryParsingException' ){
        
        // something is wrong with the query.
        const _rtn = {};
        _rtn.ok = false;
        _rtn.msg = {};
        _rtn.msg.type = 'ZULU ERROR - ORIENTDB';
        _rtn.msg.message = 'Ooops! There is a problem with the Query passed in.';

        return _rtn;
    }

    // unanticipated error
    return error;
};

module.exports = handler;