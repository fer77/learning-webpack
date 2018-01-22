var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CleanWebpackPlugin = require('clean-webpack-plugin')
let inProduction = (process.env.NODE_ENV === 'production');
let PurifyCSSPlugin = require('purifycss-webpack');
let buildManifestPlugin = require('./build/plugins/buildManifestPlugin');

module.exports = {
    entry: {
        app: [
            './src/main.js',
             './src/main.scss'
            ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new ExtractTextPlugin('[name].css'),

        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProduction
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
        
        new buildManifestPlugin(),
// Webpack will fire this function and will containe the compile stats: 
        // function() {
            // this.plugin('done', stats => {
            //     require('fs').writeFileSync(
            //         path.join(__dirname, 'dist/manifest.json'),
            //         JSON.stringify(stats.toJson().assetsByChunkName)
            //         );
            // })
        // }
    ]
};

if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}