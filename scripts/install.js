/* eslint-disable */
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const cs = a => console.log(JSON.stringify(a));

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
