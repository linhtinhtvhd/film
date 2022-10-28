import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/auth/login/succes', {
            target: 'https://film-pinklink.herokuapp.com',
            changeOrigin: true,
        }),
    );
};
