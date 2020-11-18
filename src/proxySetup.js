const { createProxyMiddleware } = require("http-proxy-middleware");
const target =
  process.env.REACT_APP_API_URL + "/api" || "http://  :5000/api";
module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
    })
  );
};
