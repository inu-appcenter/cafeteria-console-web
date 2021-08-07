<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <DrawerList />
      <!--v-container fluid>
        <v-switch v-model="this.$vuetify.theme.dark" v-on:change="setDark" label="dark mode"/>
      </v-container-->
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn class="pa-0" href="/" text>
        <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>
        <span class="pa-1 light-blue--text">BETA</span>
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

  methods: {
    setDark(dark) {
      setDarkInternal(this, dark);
    },
  },

  created() {
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
