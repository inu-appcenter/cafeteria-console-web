<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" lg="4" md="7" sm="8" xs="12">
              <v-card :loading="loading">
                <!-- titles -->
                <v-card-title class="justify-center">로그인</v-card-title>

                <!-- form -->
                <v-card-text>
                  <v-form ref="form" v-model="valid" @submit.prevent="login">
                    <v-text-field
                      v-model="username"
                      :rules="usernameRules"
                      label="ID"
                      required
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="비밀번호"
                      required
                      type="password"
                      @keydown.enter="login"
                    ></v-text-field>
                  </v-form>

                  <div v-if="errorMessage.length" class="red--text">
                    {{ errorMessage }}
                  </div>
                </v-card-text>

                <!-- submit -->
                <v-card-text>
                  <v-btn :disabled="!valid" width="100%" @click="login"> 로그인 </v-btn>
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
import http from '@/core/request/http';

export default {
  name: 'Login',

  data: () => ({
    valid: false,
    loading: false,
    errorMessage: '',

    username: null,
    usernameRules: [v => !!v || 'ID를 입력해 주세요'],

    password: null,
    passwordRules: [v => !!v || '비밀번호를 입력해 주세요'],
  }),

  mounted() {
    console.log('야 서랍 닫아!!!');
    EventBus.$emit('drawer', false);

    EventBus.$on('tell-user-that-you-need-to-login', () => {
      console.log('네 토스트 띄웁니다!');

      this.$toasted.show('로그인이 필요합니다', {
        theme: 'bubble',
        icon: 'warning',
        duration: 2000,
      });
    });
  },

  methods: {
    async login() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      if (await this.getLoginResult(this.username, this.password)) {
        await this.onLoginSuccess(this.username);
      } else {
        await this.onLoginFail();
      }

      this.loading = false;
    },

    async getLoginResult(username, password) {
      try {
        const result = await http.post(config.api.endpoints.login, {
          username,
          password,
        });

        return result.ok;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    async onLoginSuccess(id) {
      console.log('야 로그인 성공이래! 드로어에 띄워!');
      EventBus.$emit('login-success');

      this.$toasted.show(`안녕하세요, ${id}님`, {
        icon: 'account_circle',
        duration: 2000,
      });
      await this.$router.push('/');
    },

    async onLoginFail() {
      this.errorMessage = 'ID와 비밀번호를 확인해 주세요';
    },
  },
};
</script>

<style scoped></style>
