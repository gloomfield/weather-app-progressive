// created as described in doc (weather app excercise starter)
const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'js'),
    },
    mode: "development",
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {       
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]_[local]--[hash:base64:5]',
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // using class-properties
                        presets: ['@babel/preset-env', '@babel/react', 
                            {'plugins': ['@babel/plugin-proposal-class-properties']}
                        ]
                    }
                }
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                use: {
                    loader: 'url-loader?limit=100000' 
                }
            },
                
        ]
    }
};