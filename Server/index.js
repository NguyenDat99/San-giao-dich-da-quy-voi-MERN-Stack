require('babel-polyfill');
require('babel-register');

// patch console to adding timestamp
require('console-stamp')(console);

// register the main script server file
require('./src/main');
