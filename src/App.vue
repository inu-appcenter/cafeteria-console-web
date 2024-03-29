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
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <DrawerList />
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn class="pa-0" href="/" text>
        <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>
        <span class="pa-1 light-blue--text">BETA</span>
      </v-btn>
      <v-spacer />
      <v-btn class="pa-0" href="/#/admin/visit" text>
        <v-icon>mdi-file-document-edit</v-icon>
      </v-btn>
      <v-btn class="pa-0" href="/#/admin/checkin" text>
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import DrawerList from './components/DrawerList';
import config from '../config';
import colors from '@/res/colors';
import EventBus from '@/event-bus';
import {unlockAudio} from '@/utils/audio';

function setDarkInternal(context, dark) {
  context.$vuetify.theme.dark = dark;
  window.document.getElementById('root').style.backgroundColor = dark ? colors.backgroundDark : colors.backgroundWhite;
}

export default {
  name: 'App',
  components: {DrawerList},

  data() {
    return {
      drawer: false,
      title: config.pageTitle,
    };
  },

  created() {
    unlockAudio();

    setDarkInternal(this, true);

    EventBus.$on('drawer', openOrNot => {
      console.log('네 서랍 닫습니다!');

      this.$nextTick(() => {
        this.drawer = openOrNot;
      });
    });

    EventBus.$on('take-user-to-login-screen', () => {
      console.log('네 로그인 화면으로 안내하겠습니다! 사용자야 이리와 나랑 같이가자');

      const loginPath = '/login';
      if (this.$route.path !== loginPath) {
        this.$router.push(loginPath);
      }
    });
  },
};
</script>

<style>
body {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
