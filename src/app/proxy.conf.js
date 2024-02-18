const PROXY_CONFIG = {
    "/api/*": {
        target: '',//www.mydefaulturl.com,
        // router: function (req) {
        //     // some condition here
        //     var target = 'https://www.myrewrittenurl.com'; // or some custom code
        //     return target;
        // },
        changeOrigin: true,
        secure: false
    }
};
module.exports = PROXY_CONFIG;