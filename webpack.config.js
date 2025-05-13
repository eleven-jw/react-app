const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dir } = require('console');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static:{
            directory: path.join(__dirname, 'dist'),
        },
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:5000', // Replace with your API server URL
        //         changeOrigin: true,
        //         pathRewrite: { '^/api': '' }, // Remove /api prefix when forwarding to the API server
        //     },
        // }
    },
};