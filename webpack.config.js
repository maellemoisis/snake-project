const path = require('path'); // plugin de manip de fichier
const webpack = require('webpack'); // webpack
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin de création HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Plugin de nettoyage
const babelConfig = require('./babel.config');

const APP_TITLE = 'My First Application'; // titre de l'application
const PUBLIC_PATH = '/'; // url de base de l'appli en production

const webappPath = '/src/'; // Chemin de l'app
const distPath = '/public/'; // Chemin de destination du build

function generateBaseConfig() {
  return {
    entry: path.join(path.join(__dirname, webappPath), './index.jsx'), // point d'entrée du build

    // Configuration de la sortie
    output: {
      path: path.join(__dirname, distPath),
      filename: '[name].bundle.js',
      publicPath: PUBLIC_PATH,
      sourceMapFilename: '[name].map', // Generation du fichier source map
    },

    // plugin de build de base
    plugins: [
      // Définit comme variable d'env le titre et le chemin de l'app
      // pour une injection facile dans les composant
      new webpack.DefinePlugin({
        'process.env.APP_TITLE': JSON.stringify(APP_TITLE),
      }),
      // plugin de nettoyage du dossier de build entre 2 build
      new CleanWebpackPlugin(),
      // Génération du fichier index.html à partir d'un template
      new HtmlWebpackPlugin({
        template: path.join(path.join(__dirname, webappPath), './index.html'),
        filename: 'index.html',
        inject: 'body',
        favicon: path.join(path.join(__dirname, webappPath), './favicon.ico'),
        title: APP_TITLE,
      }),
    ],

    // Configuration du bundling
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          // Créer des noeuds <style>
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          // Transpose le CSS en commonJS
          { loader: 'css-loader', options: { modules: true, sourceMap: true } },
        ],

        // Suivre les instructions de https://github.com/roylee0704/react-flexbox-grid
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          { loader: 'css-loader', options: { modules: true, sourceMap: true } },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
      ],
    },

    // liste des extension gérées
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    },
  };
}

function generateProductionConfig() {
  const CONFIG = generateBaseConfig();
  // Lib d'accès au SGF
  const fs = require('fs'); // eslint-disable-line global-require
  // On injecte dans notre fichier de sortie une bannière contenant notre licence
  CONFIG.plugins.push(new webpack.BannerPlugin(fs.readFileSync('./LICENSE', 'utf8')));
  return CONFIG;
}

function generateDevelopmentConfig() {
  const CONFIG = generateBaseConfig();
  // Remplacement automatique de la page lorsqu'un fichier est modifié même un fichier css
  CONFIG.plugins.push(new webpack.HotModuleReplacementPlugin());
  CONFIG.devtool = 'inline-source-map';

  // Configuration du serveur de dev
  CONFIG.devServer = {
    port: 3000,
    host: '0.0.0.0',

    // Pour pouvoir revenir en arriere en cliquant sur "précédant" dans Chrome
    historyApiFallback: true,
    noInfo: false, // Donner des infos aux clients
    stats: 'minimal', // Calcul de statistiques minimum
    publicPath: '/', // Chemin pulique fournie
    contentBase: path.join(__dirname, webappPath), // Chemin complet du contenu de base
    hot: true, // Activation du plugin de remplacement à chaud
  };

  return CONFIG;
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return generateDevelopmentConfig();
  }
  return generateProductionConfig();
};
