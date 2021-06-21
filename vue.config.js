// vue.config.js for less-loader@6.0.0
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    // If you are using less-loader@5 please spread the lessOptions to options directly
                    modifyVars: {
                        'primary-color': '#D99CA8',
                        'link-color': '#D99CA8',
                        'border-radius-base': '2px',
                        'success-color': '#D99CA8', // 成功色
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
    lintOnSave: false,
};
