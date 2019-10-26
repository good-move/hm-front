const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';

const resolvePath = (_path) => path.resolve(__dirname, _path);

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: resolvePath('dist'),
        publicPath: "/static/"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template.html',
            cache: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    resolve: {
        alias: {
            src:  resolvePath('src/'),
            util: resolvePath('src/utils/'),
        }
    },
};