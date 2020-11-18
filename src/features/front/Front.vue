<template>

  <v-container class="fill-height mb-6">
    <v-row justify="center">
      <div>
        <p class="display-1 text--primary">안녕하세요</p>

        <p v-for="service in services"
           :key="service.name">
          <a :href="'/#/' + service.name">{{ service.subtitle }}</a>
        </p>

      </div>
    </v-row>

    <v-row justify="center">
      <div>
        <p>{{ packageName }} v{{ packageVersion }}</p>
        <p>{{ server.packageName }} v{{ server.version }}</p>
      </div>
    </v-row>

  </v-container>

</template>

<script>
import config from '../../../config';

export default {
  name: 'Front',

  data() {
    const packageInfo = require('../../../package.json');

    return {
      packageName: packageInfo.name,
      packageVersion: packageInfo.version,

      server: {
        packageName: 'cafeteria-management-server',
        version: null
      },

      services: config.services,
    };
  },

  created() {
    this.load();
  },

  methods: {
    async load() {
      const response = await fetch(config.api.endpoints.version);
      this.server.version = await response.text();
    }
  }
}
</script>

<style scoped>

</style>
