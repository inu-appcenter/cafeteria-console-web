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
     * @param ticket
     * @param gracefulInTime
     */
    async tryCheckInAndGetError(ticket: string, gracefulInTime: boolean): Promise<HttpError | undefined> {
      try {
        await CheckInRepository.checkIn(ticket, gracefulInTime);

        this.fetchContext().then();

        playSound('/sounds/success.mp3').then();

        return undefined;
      } catch (e) {
        assert(e instanceof HttpError);

        playSound('/sounds/fail.mp3').then();

        return e;
      }
    },

    finishLoading() {
      this.checkInLoading = false;
    },

    async dealWithResult(error: HttpError | undefined, ticket: string) {
      if (error == null) {
        this.showSuccessAndAutoDismiss();
      } else {
        if (error.error === 'check_in_not_in_time') {
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
        } else {
          await this.$dialog.showAndWait(BigDialog, {
            level: 3,
            title: '체크인을 진행할 수 없습니다.',
            text: `${error.message}`,
            neutralButtonText: '닫기',
            showClose: false,
          });
        }
      }
    },

    showSuccessAndAutoDismiss() {
      this.checkInSuccess = true;
      setTimeout(() => {
        this.checkInSuccess = null;
      }, 750);
    },
  },
});
