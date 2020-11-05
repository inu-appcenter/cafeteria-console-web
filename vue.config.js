module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pages: {
    'index': {
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: 'Home',
    },
    'auth': {
      entry: './src/pages/auth/main.js',
      template: 'public/index.html',
      title: 'Authentication',
    },
  },
};

