<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <DrawerList/>
      <!--v-container fluid>
        <v-switch v-model="this.$vuetify.theme.dark" v-on:change="setDark" label="dark mode"/>
      </v-container-->
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <a class="nostyle" href="/">
        <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>
      </a>
      <span class="pa-2 light-blue--text">BETA</span>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import DrawerList from './components/DrawerList';
import config from '../../../config';
import colors from '@/res/colors';

function setDarkInternal(context, dark) {
  context.$vuetify.theme.dark = dark;
  window.document.getElementById('root').style.backgroundColor = dark ? colors.backgroundDark : colors.backgroundWhite;
}

export default {
  name: 'App',
  components: {DrawerList},

  data: () => ({
    drawer: true,
    title: config.pageTitle,
  }),

  methods: {
    setDark(dark) {
      setDarkInternal(this, dark);
    }
  },

  created() {
    setDarkInternal(this, true);
  },
};
</script>

<style>

body {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a.nostyle:link {
  text-decoration: inherit;
  color: inherit;
  cursor: auto;
}

a.nostyle:visited {
  text-decoration: inherit;
  color: inherit;
  cursor: auto;
}
</style>

