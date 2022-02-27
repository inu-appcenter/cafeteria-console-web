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
import assert from 'assert';
import HttpError from '@/core/request/HttpError';
import BigDialog from '@/core/component/dialog/BigDialog.vue';
import {playSound} from '@/utils/audio';
import CheckInBaseMixin from '@/features/checkin/mixins/CheckInBaseMixin';
import CheckInRepository from '@/features/checkin/CheckInRepository';

export default Vue.extend({
  mixins: [CheckInBaseMixin],

  data() {
    return {
      checkInLoading: false,
      checkInSuccess: false,
    };
  },

  methods: {
    /** Override */
    async handleDecodeResult(content: string): Promise<void> {
      await this.requestCheckIn(content);
    },

    async requestCheckIn(ticket: string, gracefulInTime: boolean = false) {
      this.suspendCamera();
      this.startLoading();

      const error = await this.tryCheckInAndGetError(ticket, gracefulInTime);

      this.finishLoading();
      this.resumeCamera();

      await this.dealWithResult(error, ticket);
    },

    startLoading() {
      this.checkInLoading = true;
    },

    /**
     * 서버와 통신하고, 결과를 반환만 하면 나머지는 다른 친구들이 다 해줍니다.
     * 네트워크 타고 처리 끝났으면 최대한 신속히 반환합니다.
     *
     * @param ticket 예약 티켓.
     * @param gracefulInTime "시간 조금 다른건 봐줘" 모드.
     */
    async tryCheckInAndGetError(ticket: string, gracefulInTime: boolean): Promise<HttpError | undefined> {
      try {
        const cafeteriaId = this.selectedCafeteria?.id;
        assert(cafeteriaId, new HttpError('no_selected_cafeteria', '선택된 식당 정보가 없습니다!'));

        await CheckInRepository.checkIn(ticket, cafeteriaId, gracefulInTime);

        playSound('/sounds/success.mp3').then();

        return undefined;
      } catch (e) {
        playSound('/sounds/fail.mp3').then();

        return e instanceof HttpError
          ? e
          : new HttpError(`fucked_up`, `죄송합니다. 정말 심각한 문제가 발생했습니다. 관리자에게 문의해주세요. ${e}`);
      }
    },

    finishLoading() {
      this.checkInLoading = false;
    },

    /**
     * 반환된 결과를 가지고 사용자에게 표시하거나 추가 조치를 취합니다.
     * @param error (존재할 경우) 발생한 에러.
     * @param ticket 요청에 포함된 티켓.
     */
    async dealWithResult(error: HttpError | undefined, ticket: string) {
      if (error == null) {
        await this.showSuccessAndAutoDismiss();
      } else {
        switch (error.error) {
          case 'check_in_not_in_time':
            await this.checkInNotInTime(error, ticket);
            break;

          case 'check_in_not_in_place':
            await this.checkInNotInPlace(error);
            break;

          default:
            await this.checkInUnavailable(error);
            break;
        }
      }
    },

    async showSuccessAndAutoDismiss() {
      this.checkInSuccess = true;

      setTimeout(() => {
        this.checkInSuccess = null;
      }, 750);
    },

    async checkInNotInTime(error: HttpError, ticket: string) {
      const allow = await this.$dialog.showAndWait(BigDialog, {
        level: 2,
        title: '⚠️ 앗 잠시만요...!',
        text: `${error.message} 체크인을 진행할까요?`,
        positiveButtonText: '진행',
        neutralButtonText: '중단',
        showClose: false,
      });

      if (allow === true) {
        await this.requestCheckIn(ticket, true);
      }
    },

    async checkInNotInPlace(error: HttpError) {
      await this.$dialog.showAndWait(BigDialog, {
        level: 3,
        title: '다른 식당의 예약입니다.',
        text: `${error.message}`,
        neutralButtonText: '닫기',
        showClose: false,
      });
    },

    async checkInUnavailable(error: HttpError) {
      await this.$dialog.showAndWait(BigDialog, {
        level: 3,
        title: '체크인을 진행할 수 없습니다.',
        text: `${error.message}`,
        neutralButtonText: '닫기',
        showClose: false,
      });
    },
  },
});
