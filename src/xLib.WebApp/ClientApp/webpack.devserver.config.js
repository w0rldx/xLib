module.exports = {
    proxy: {
        '/api': {
            target: 'https://localhost:7237/api',
            pathRewrite: { '^/api': '' },
            secure: false,
            changeOrigin: true,
            logLevel: 'debug',
        },
        '/swagger': {
            target: 'https://localhost:7237/swagger',
            pathRewrite: { '^/swagger': '' },
            secure: false,
            changeOrigin: true,
            logLevel: 'debug',
        },
    },
};
