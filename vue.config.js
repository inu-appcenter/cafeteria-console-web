module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pages: {
    'index': {
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: '카페테리아 관리자 페이지',
    },
    'auth': {
      entry: './src/pages/auth/main.js',
      template: 'public/index.html',
      title: '인증',
    },
  },
};

