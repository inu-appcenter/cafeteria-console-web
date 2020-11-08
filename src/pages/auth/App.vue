<template>
  <v-app>
      <v-content>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-content>
  </v-app>
</template>

<script>
import colors from '@/res/colors';

function setDarkInternal(context, dark) {
  context.$vuetify.theme.dark = dark;
  window.document.getElementById('root').style.backgroundColor = dark ? colors.backgroundDark : colors.backgroundWhite;
}

export default {
  name: 'App',

  created() {
    setDarkInternal(this, true);
  },
};
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
