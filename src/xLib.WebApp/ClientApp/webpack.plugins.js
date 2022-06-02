const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv(),
    new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'src/Index.html',
        minify: {
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            useShortDoctype: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
        },
    }),
];
