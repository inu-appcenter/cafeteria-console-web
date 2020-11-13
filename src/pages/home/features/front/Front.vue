<template>

  <v-container class="fill-height mb-6">
    <v-row justify="center">
      <div>
        <p class="display-1 text--primary">안녕하세요</p>

        <p v-for="service in services"
           :key="service.name"
           :to="service.name">
          <a :href="service.name">{{ service.subtitle }}</a>
        </p>

      </div>
    </v-row>

    <v-row justify="center">
      {{ packageName }} v{{ packageVersion }}
    </v-row>

  </v-container>

</template>

<script>
import config from '../../../../../config';

export default {
  name: 'Front',

  data() {
    const packageInfo = require('../../../../../package.json');

    return {
      packageName: packageInfo.name,
      packageVersion: packageInfo.version,
      services: config.services
    };
  }
}
</script>

<style scoped>

</style>
