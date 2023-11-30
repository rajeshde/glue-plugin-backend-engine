module.exports = () => {
  return [
    {
      "server_name": "api"
    },
    {
      "path": "/backend/engine/(.*)",
      "proxy": {
        "instance": `engine:${process.env.APP_PORT}`,
        "path": "/$1"
      }
    }
  ];
};
