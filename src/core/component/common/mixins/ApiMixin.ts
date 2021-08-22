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
