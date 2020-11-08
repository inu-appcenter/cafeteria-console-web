<template>

  <v-container class="fill-height mb-6">
    <v-row justify="center">
      <p class="display-1 text--primary">안녕하세요</p>
    </v-row>

    <v-row justify="center">
      {{ packageName }} v{{ packageVersion }}
    </v-row>

  </v-container>

</template>

<script>
export default {
  name: 'Front',

  data() {
    const packageInfo = require('../../../../../package.json');

    return {
      packageName: packageInfo.name,
      packageVersion: packageInfo.version
    };
  }
}
</script>

<style scoped>

</style>
