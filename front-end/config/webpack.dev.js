const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    mode: 'none',
    entry: {
        index: './src/javascripts/index',
        login: './src/javascripts/login'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dev')
    },
    devServer: {
        port:8000,
        host: '10.60.18.149',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'static', to: 'static' }
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            chunks: ['login']
        }),
    ],
    module: {
        rules: [
            {
                test: /.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8100
                        }
                    }
                ]
            },
            {
                test: /.html$/,
                use: ['string-loader']
            },
            {
                test: /.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader?optional=runtime',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, '../src'),
            "@controllers": path.resolve(__dirname, '../src/javascripts/controllers'),
            "@modules": path.resolve(__dirname, '../src/javascripts/modules'),
            //"@api": path.resolve(__dirname, '../src/javascripts/api'),
            "@models": path.resolve(__dirname, '../src/javascripts/models'),
            "@utils": path.resolve(__dirname, '../src/javascripts/utils'),
            "@views": path.resolve(__dirname, '../src/javascripts/views'),
            //"@assets": path.resolve(__dirname, '../src/assets'),
            "@styles": path.resolve(__dirname, '../src/stylesheets'),
            "@router": path.resolve(__dirname, '../src/javascripts/router'),
        }
    }
}