import Vue from 'vue';
import assert from 'assert';
import HttpError from '@/core/request/HttpError';
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
     *
     * @param ticket
     * @param gracefulInTime
     */
    async tryCheckInAndGetError(ticket: string, gracefulInTime: boolean): Promise<HttpError | undefined> {
      try {
        await CheckInRepository.checkIn(ticket, gracefulInTime);

        this.fetchContext().then();

        await playSound('/sounds/success.mp3');

        return undefined;
      } catch (e) {
        assert(e instanceof HttpError);

        await playSound('/sounds/fail.mp3');

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
          const allow = await this.$dialog.confirm({
            text: `${error.message} 체크인을 허용할까요?`,
            showClose: false,
            actions: {
              false: {
                text: '비허용',
                color: 'red',
              },
              true: {
                text: '허용',
                color: 'blue',
              },
            },
          });

          if (allow) {
            await this.requestCheckIn(ticket, true);
          }
        } else {
          await this.$dialog.warning({
            text: error.message,
            showClose: false,
            actions: {
              ok: '확인',
            },
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
