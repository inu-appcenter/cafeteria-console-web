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
function setDarkInternal(context, dark) {
  context.$vuetify.theme.dark = dark;
  window.document.getElementById('doc').style.backgroundColor = dark ? '#121212' : '#FFFFFF';
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
