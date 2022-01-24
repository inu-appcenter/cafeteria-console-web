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

import Vue from 'vue';

/**
 * API 호출 후 결과를 다루는 메소드를 가지고 있는 믹스인입니다.
 */
export default Vue.extend({
  methods: {
    async showResult(resultPromise: Promise<boolean>, onSuccessMessage: string): Promise<boolean> {
      try {
        const result = await resultPromise;

        if (result) {
          this.$toasted.show(onSuccessMessage, {duration: 2000, icon: 'done'});
        } else {
          this.$toasted.show('요청을 처리하지 못 하였습니다', {duration: 2000, icon: 'warning'});
        }

        return result;
      } catch (e) {
        this.$toasted.show('심각한 문제가 발생하였습니다.', {
          duration: undefined,
          icon: 'error',
          action: [
            {text: '자세히', onClick: () => alert(e)},
            {text: '닫기', onClick: (e, toastObject) => toastObject.goAway(0)},
          ],
        });

        return false;
      }
    },

    async getResult<T>(resultPromise: Promise<T>): Promise<T | undefined> {
      try {
        return await resultPromise;
      } catch (e) {
        return undefined;
      }
    },

    success(message?: string) {
      this.$toasted.show(message ?? '요청이 성공적으로 처리되었습니다.', {duration: 1000, icon: 'done'});
    },

    fail(message?: string) {
      this.$toasted.show(message ?? '요청을 처리하지 못 하였습니다', {duration: 1000, icon: 'warning'});
    },
  },
});
