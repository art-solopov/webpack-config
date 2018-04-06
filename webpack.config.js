const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const path = require('path');
const process = require('process');

const webpack = require('webpack');

/* BEGIN preparations/fact gathering */
const isProd = process.env.WEBPACK_ENV == 'production';
/* END preparations/fact gathering */

/* BEGIN output options */
let outputOptions = {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
};

if (isProd) {
    outputOptions.filename = '[name]-[hash].js';
}

/* END output options */

const babel = {
    test: /\.js$/, exclude: /node_modules/,
    loader: "babel-loader",
    options: {
        presets: ['env', 'stage-2']
    }
};

const coffee = {
    test: /\.coffee$/, exclude: /node_modules/,
    use: [
        { loader: 'coffee-loader',
          options: {
              transpile: { presets: ['env'] }
          }
        }
    ]
};

const css = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            { loader: 'css-loader' }
        ]
    })
};

const less = {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
        ]
    })
};

module.exports = {
    entry: {
        app: './index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    mode: (isProd ? 'production' : 'development'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            babel,
            coffee,
            css,
            less
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new ManifestPlugin()
    ]
};
