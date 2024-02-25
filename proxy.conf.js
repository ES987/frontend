const PROXY_CONFIG = [
    {
      context: [
          "/api/conf"
      ],
      target: "https://localhost:44396/",
      secure: false,
      logLevel : "debug",
      pathRewrite: {
            "^/api/conf": ""
       }
   }
  ]
  
  module.exports = PROXY_CONFIG;