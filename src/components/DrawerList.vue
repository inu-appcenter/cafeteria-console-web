<!--
  - This file is part of INU Cafeteria.
  -
  - Copyright 2022 INU Global App Center <potados99@gmail.com>
  -
  - INU Cafeteria is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - INU Cafeteria is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <v-list nav dense expand>
    <!-- 사용자 프로필 -->
    <v-list-item v-show="username">
      <v-list-item-action>
        <v-icon>account_circle</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title class="font-weight-medium body-1">{{ username }}</v-list-item-title>
        <v-list-item-subtitle>로그인됨</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <!-- 구분선 -->
    <v-divider v-show="username" class="my-1"></v-divider>

    <!-- 서비스 메뉴 -->
    <v-list-group v-for="serviceGroup in services" :key="serviceGroup.displayName" :group="serviceGroup.name">
      <template v-slot:activator>
        <!-- 서비스 그룹의 아이콘 -->
        <v-list-item-action>
          <v-icon>{{ serviceGroup.icon }}</v-icon>
        </v-list-item-action>

        <!-- 서비스 그룹의 이름 -->
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{ serviceGroup.displayName }}</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item-group :v-model="selected">
        <v-list-item
          v-for="serviceItem in serviceGroup.items"
          :key="serviceItem.name"
          :to="`/${serviceGroup.name}/${serviceItem.name}`"
          link
        >
          <!-- 서비스 아이템의 아이콘 -->
          <v-list-item-action></v-list-item-action>

          <!-- 서비스 아이템의 이름과 설명 -->
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">{{ serviceItem.displayName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>
  </v-list>
</template>

<script>
import JWT from 'jsonwebtoken';
import EventBus from '@/event-bus';
import services from '../../services';
import {getCookie} from '@/utils/cookie';

export default {
  name: 'Drawer',

  mounted() {
    console.log('네! 사용자 이름 드로어에 표시하겠습니다!');

    EventBus.$on('login-success', () => {
      this.resolveUserName();
    });

    this.resolveUserName();
  },

  data: () => ({
    services: services,
    selected: null,
    username: null,
  }),

  methods: {
    resolveUserName() {
      const jwtInCookie = getCookie('cafeteria-console-server-token');
      const payload = JWT.decode(jwtInCookie);

      console.log(`토큰을 풀어보니 ${JSON.stringify(payload)}이군요`);

      if (payload == null) {
        return;
      }

      this.username = payload['username'];
    },
  },
};
</script>

<style scoped></style>
