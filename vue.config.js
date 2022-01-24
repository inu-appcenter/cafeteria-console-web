/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
