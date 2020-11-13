<template>
  <v-list two-line nav dense>
    <v-list-item-group v-model="selected">

      <!-- A single item -->
      <v-list-item
          v-for="service in services"
          :key="service.name"
          :to="service.name"
          link>

        <!-- Icon -->
        <v-list-item-action>
          <v-icon>{{ service.icon }}</v-icon>
        </v-list-item-action>

        <!-- Name and subtitle -->
        <v-list-item-content>
          <v-list-item-title>{{ service.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ service.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>

    </v-list-item-group>
  </v-list>
</template>

<script>
import config from '../../../../config';

export default {
  name: 'Drawer',

  data: () => ({
    services: config.services,
    selected: null
  }),
}
</script>

<style scoped>

</style>
