const path = require('path');
const glob = require('tiny-glob/sync');
const brightpack = require('brightpack');
// const RealFaviconPlugin = require('brightpack/lib/real-favicon-plugin');

const dest = 'public/static';
const publicPath = '/static/';
const watch = [
    'public/**/*.php'
];

module.exports = brightpack({ dest, publicPath, watch }, config => {
    const assets = glob('src/{img,font,media}/**.*');

    brightpack.editLoader(config, 'babel-loader', (use, rule) => {

    });

    config.entry = {
        app: [
            path.resolve('src/js/main.js'),
            path.resolve('src/css/main.css'),
            ...assets.map(p => path.resolve(p))
        ]
    };

    // config.plugins.push(new RealFaviconPlugin({
    //     filename: global.inProduction
    //         ? 'favicon/[name].[contenthash:7]'
    //         : 'favicon/[name]',
    //     config: path.resolve('src/favicon/config.json')
    // }));

    config.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.cache/webpack'),
        buildDependencies: {
            config: [
                __filename,
                path.resolve(__dirname, 'babel.config.js'),
                path.resolve(__dirname, 'postcss.config.js')
            ]
        }
    };

    if (global.inProduction) {

    }

    return config;
});