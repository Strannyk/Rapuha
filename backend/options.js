const fs = require('fs');
const configPath = './config.json';
const data = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

exports.storageConfig = data;
