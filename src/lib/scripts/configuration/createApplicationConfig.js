import webpack from 'webpack';
import createCommonConfig from './createCommonConfig';

export default function createApplicationConfig(options) {
  const {env} = options;

  const config = createCommonConfig(options);

  //source maps
  config.devtool = env === 'production' ? 'hidden-source-map' : 'eval';

  //plugins
  if (env === 'production') {

    config.plugins = config.plugins.concat([

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),

      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        output: {comments: false},
        compress: {warnings: false}
      })

      //TODO: plugin to create rev-manifest.json to map hashed files to their original names => webpack-manifest-plugin? manifest-revision-webpack-plugin?

    ]);

  }

  return config;
}