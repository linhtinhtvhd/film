import { createProxyMiddleware } from 'http-proxy-middleware';

export const app = () => {
    app.use(
        '/auth/login/succes',
        createProxyMiddleware({ target: 'https://film-pinklink.herokuapp.com', changeOrigin: true }),
    );
};
