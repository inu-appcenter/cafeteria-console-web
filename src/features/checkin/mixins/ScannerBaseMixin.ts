import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      scannerError: null,
      camera: 'rear',
      initialized: false,
    };
  },

  methods: {
    async onInit(promise: Promise<unknown>) {
      try {
        await promise;
      } catch (e) {
        this.scannerError = e;

        console.error(e);
      }
    },
  },
});
