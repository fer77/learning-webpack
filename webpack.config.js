var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let inProduction = (process.env.NODE_ENV === 'production');
let PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
    entry: {
        app: [
            './src/main.js',
             './src/main.scss'
            ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                //     use: [{
                //         loader: 'css-loader',
                //         options: { url: false }
                //     },

                //     'sass-loader'
                // ]
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash].[ext]'
                }
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),

        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProduction
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
    ]
};

if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}