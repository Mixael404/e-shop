// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: {
        main: './src/index.js',
        basket: './src/basket.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: isProduction,
    },
    devServer: {
        open: true,
        host: 'localhost',
        // hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/html/index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            filename: "basket.html",
            template: './src/html/basket.html',
            chunks: ['basket'],
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:5].css",
        }
        ),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'assets/[name][ext]',
                }
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    console.log(isProduction);
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
