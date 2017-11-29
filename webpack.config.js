var config = {
  // Package the entry file
  entry: './main.js',


  // Configure the package results, path definition output folder, filename definition package name of the file
  output: {
    path: './',
    filename: 'index.js'
  },


  // Set the server port number
  devServer: {
    inline: true,
    port: 7000
  },

  // Configure the processing logic of the module, define loader with loaders
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}

module.exports = config;
