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
import ScannerBaseMixin from '@/features/checkin/mixins/ScannerBaseMixin';

export default Vue.extend({
  mixins: [ScannerBaseMixin],

  methods: {
    async onDecode(content: string) {
      await this.handleDecodeResult(content);
    },

    /**
     * 스캔이 완료된 후에 적절한 일을 수행하도록 호출되는 콜백입니다.
     *
     * @param content 스캔 결과
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handleDecodeResult(content: string): Promise<void> {
      /**
       * 하위 믹스인 또는 컴포넌트에서 꼭 반드시 오버라이드 해주세요!
       */
      throw Error('Not implemented');
    },
  },
});
