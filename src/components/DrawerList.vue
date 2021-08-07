<template>
  <v-list dense nav two-line>
    <!-- User profile -->
    <v-list-item v-show="userName">
      <v-list-item-action>
        <v-icon>account_circle</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title class="font-weight-medium body-1">{{ userName }}</v-list-item-title>
        <v-list-item-subtitle>로그인됨</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider v-show="userName" class="my-1"></v-divider>

    <!-- Services -->
    <v-list-item-group v-model="selected">
      <!-- A single item -->
      <v-list-item v-for="service in services" :key="service.name" :to="service.name" link>
        <!-- Icon -->
        <v-list-item-action>
          <v-icon>{{ service.icon }}</v-icon>
        </v-list-item-action>

        <!-- Name and subtitle -->
        <v-list-item-content>
          <v-list-item-title>{{ service.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ service.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import config from '../../config';
import EventBus from '@/event-bus';
import JWT from 'jsonwebtoken';

export default {
  name: 'Drawer',

  mounted() {
    console.log('네! 사용자 이름 드로어에 표시하겠습니다!');

    EventBus.$on('sign-in-success', () => {
      this.resolveUserName();
    });

    this.resolveUserName();
  },

  data: () => ({
    services: config.services,
    selected: null,
    userName: null,
  }),

  methods: {
    resolveUserName() {
      const jwtInCookie = window.document.cookie.split('=')[1];
      const payload = JWT.decode(jwtInCookie);

      console.log(`토큰을 풀어보니 ${JSON.stringify(payload)}이군요`);

      this.userName = payload.userName;
    },
  },
};
</script>

<style scoped></style>
