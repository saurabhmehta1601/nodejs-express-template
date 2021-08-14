const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
 entry: "./src/index.ts",
    mode:"production",
    externalsPresets: {node: true},
    externals: [nodeExternals()],
    output: {
        path : path.resolve(__dirname , "dist"),
        filename : "bundle.min.js"
    },
    module : {
        rules : [
            {test: /\.ts/ , use: ["ts-loader"] , exclude: /node_modules/ }
        ]
    },
    resolve : {
        extensions : ['.js', '.ts', '.json'],
    },
}
