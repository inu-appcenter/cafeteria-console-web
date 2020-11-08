<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <DrawerList/>
      <v-container fluid>
        <v-switch v-model="this.$vuetify.theme.dark" v-on:change="setDark" label="dark mode"/>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import DrawerList from './components/DrawerList';
import config from '../../../config';
// import colors from '@/res/colors';

function setDarkInternal(context, dark) {
  context.$vuetify.theme.dark = dark;
  // window.document.getElementById('doc').style.backgroundColor = dark ? colors.backgroundDark : colors.backgroundWhite;
}

export default {
  name: 'App',
  components: {DrawerList},

  data: () => ({
    drawer: null,
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
