const path = require('path');

module.exports = {
    entry: {
        libs: './src/libs.js',
        app: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};
