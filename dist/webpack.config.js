var path = require('path');
//devtool: 'inline-source-map',
module.exports = {
    entry: './index.ts',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: 'empty'
    }
};
//# sourceMappingURL=webpack.config.js.map