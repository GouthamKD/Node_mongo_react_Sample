module.exports = {
    entry: './main.js',
    output: {
        path:__dirname,
        publicpath:'/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            
            resolve:{
                extensions:['','.js','.jsx']
            },
            devServer:{
                contentBase:'./'
            }
        }]
    }
};