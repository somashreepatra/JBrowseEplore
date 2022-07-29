const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 8001,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude:
          /node_modules/,
        use: {
          loader:
            'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
        
      // For remotes (please adjust)
      name: "react",
      library: { type: "var", name: "react" },
      filename: "remoteEntry.js", // <-- Meta Data
      exposes: {
          //'./webcomponents': './src/sampleIntegratedApp.js'
          './webcomponents': './src/index.js'
      },        
      //shared: ["react", "react-dom"]
    }),
    // new ModuleFederationPlugin(
    //   {
    //     name: 'JBrowse',
    //     filename:
    //       'remoteEntry.js',

    //     exposes: {
    //       './JBrowseModule': './JBrowseApp.js'
    //     },
    //     remotes: {
    //         //JBrowse: 'JBrowse@https://rany.tk/mfe/mfe1/dist/2021Feb27/remoteEntry.js',
    //     },
    //   }
    // ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};