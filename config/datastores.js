/*
** List of datastore configurations
** 
*/

const datastores = {};

datastores.orientdb_local_security = {
    type : 'orientdb',
    server : {
        host : 'localhost',
        port : 2424,
        username : 'root',
        password : '0ri3ntDB',
        pool : {
            max : 10
        }
    },
    database : {
        name : 'CTOPS-UI',
        username : 'admin',
        password : 'admin'
    }
};

datastores.orientdb_test_security = {
    type : 'orientdb',
    server : {
        host : '192.168.1.17',
        port : 2424,
        username : 'root',
        password : '0ri3ntDB',
        pool : {
            max : 10
        }
    },
    database : {
        name : 'CTOPS-UI',
        username : 'admin',
        password : 'admin'
    }
};

datastores.orientdb_local_api = {
    type : 'orientdb',
    server : {
        host : 'localhost',
        port : 2424,
        username : 'root',
        password : '0ri3ntDB',
        pool : {
            max : 10
        }
    },
    database : {
        name : 'zulu-api-01',
        username : 'admin',
        password : 'admin'
    }
};

datastores.orientdb_test_api = {
    type : 'orientdb',
    server : {
        host : '192.168.1.17',
        port : 2424,
        username : 'root',
        password : '0ri3ntDB',
        pool : {
            max : 10
        }
    },
    database : {
        name : 'zulu-api-01',
        username : 'admin',
        password : 'admin'
    }
};

module.exports = datastores;