module.exports = {
    pages:{
        'index':{
            entry: 'examples/main.js',
            filename: 'index.html',
            title:'示例',
            template:'public/index.html'
        }
    }, 
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap:false,
    chainWebpack: config => {
        config.module
              .rule('js')
              .include
              .add(function(){
                  return ['packages']
              })
              .end()
              .use('babel')
              .loader('babel-loader')
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options['transformAssetUrls'] = {
                    video: ['packages', 'poster'],
                    source: 'packages',
                    img: 'packages',
                    image: 'xlink:href'
                }
                return options;
            })
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options['limit'] = 8000
                return options;
            })
    },
    css: {
        extract:false,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('autoprefixer')({
                        browsers:[
                            'last 7 versions',"Android >= 2.1", "iOS >= 4", "IE >= 8", "Firefox >= 15", "Opera >= 8"
                        ]
                    })
                ]
            }
        }
    },
}