const fs = require('fs');
const configPath = './config.json';
const storageConfig = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

module.exports = storageConfig;
