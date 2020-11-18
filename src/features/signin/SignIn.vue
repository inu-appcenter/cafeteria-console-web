<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" lg="3">
              <v-card :loading="loading">

                <!-- titles -->
                <v-card-title class="justify-center">로그인</v-card-title>

                <!-- form -->
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                        type="text"
                        v-model="userId"
                        :rules="userIdRules"
                        label="ID"
                        required
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        v-model="password"
                        :rules="passwordRules"
                        label="비밀번호"
                        required
                        @keydown.enter="signIn"
                    ></v-text-field>
                  </v-form>

                  <div v-if="errorMessage.length" class="red--text">
                    {{ errorMessage }}
                  </div>
                </v-card-text>

                <!-- submit -->
                <v-card-text>
                  <v-btn :disabled="!valid" @click="signIn" width="100%">
                    로그인
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from '../../../config';
import EventBus from '@/event-bus';

export default {
  name: 'SignIn',

  data: () => ({
    valid: false,
    loading: false,
    errorMessage: '',

    userId: null,
    userIdRules: [
      (v) => !!v || 'ID를 입력해 주세요',
    ],

    password: null,
    passwordRules: [
      (v) => !!v || '비밀번호를 입력해 주세요',
    ],
  }),

  mounted() {
    console.log('야 서랍 닫아!!!');
    EventBus.$emit('drawer', false);

    EventBus.$on('tell-user-that-you-need-to-sign-in', () => {
      console.log('네 토스트 띄웁니다!');

      this.$toasted.show('로그인이 필요합니다', {
        theme: 'bubble',
        icon: 'warning',
        duration: 2000
      });
    });
  },

  methods: {
    async signIn() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      if (await this.getSignInResult(this.userId, this.password)) {
        await this.onSignInSuccess(this.userId);
      } else {
        await this.onSignInFail();
      }

      this.loading = false;
    },

    async getSignInResult(id, password) {
      try {
        const params = new URLSearchParams();
        params.append('id', id);
        params.append('password', password);

        const result = await fetch(config.api.endpoints.signIn, {
          method: 'POST',
          credentials: 'include',
          body: params
        });

        return result.ok;

      } catch (e) {
        console.log(e);
        return false
      }
    },

    async onSignInSuccess(id) {
      this.$toasted.show(`안녕하세요, ${id}님`, {
        icon: 'done',
        duration: 2000
      });
      await this.$router.push('/');
    },

    async onSignInFail() {
      this.errorMessage = 'Wrong auth!';
    }
  },
};
</script>

<style scoped>

</style>
