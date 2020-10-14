const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on, config) => {
	on('file:preprocessor', cypressTypeScriptPreprocessor);
	require('@cypress/code-coverage/task')(on, config);
	return config;
};
