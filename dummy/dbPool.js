const props = require('./properties.js');
const connection_string = 'postgresql://' + props.database_username + ':' + props.database_password +
  '@' + props.database_host + ':' + props.connection_port + '/' + props.database_name;
const pgp = require('pg-promise')();
var db = {};
db.conn = pgp(connection_string);

module.exports = db;