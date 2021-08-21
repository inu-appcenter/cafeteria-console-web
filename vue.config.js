module.exports = {
  transpileDependencies: ['vuetify'],

  // 휴 프로덕션 webpack 빌드에서는 minify가 들어가기 때무네
  // 클래스 이름을 기반으로 하는 reflection이 망할수밖에 없다!
  // 그래서 minify 비활성화 ㅎㅎ
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap(args => {
      const {terserOptions} = args[0];
      terserOptions.keep_classnames = true;
      terserOptions.keep_fnames = true;
      return args;
    });
  },

  pages: {
    index: {
      entry: './src/main.ts',
      template: './public/index.html',
      title: '카페테리아 콘솔',
    },
  },
};
