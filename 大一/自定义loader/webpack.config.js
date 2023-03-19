const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].js"
    },
    resolveLoader: {
        modules: ['node_modules','./src/loader']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'replaceLoader',
                options: {
                    targetStr: 'red',
                    resultStr: 'Red'
                }
            }]
        }]
    },
}