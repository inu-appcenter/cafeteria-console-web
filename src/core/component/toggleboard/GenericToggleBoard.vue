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
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xl="12" xs="12">
      <div>
        <div class="mx-2 my-1">
          <h2>{{ itemDisplayName }}</h2>
        </div>

        <LoadingStatusView :error="error" :loading="fetching" skeleton-type="list-item-three-line" />
        <EmptyView :item-display-name="itemDisplayName" :all-items="allItems" :fetching="fetching" :error="error" />

        <v-layout class="pl-6 pr-6 pt-0 pb-0" row>
          <v-row v-masonry item-selector=".item" transition-duration="0.3s">
            <v-col
              v-for="item of allItems"
              :key="item['keyName']"
              v-masonry-tile
              class="item pa-2"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
            >
              <GenericToggleBoardItem
                :item="item"
                :name-field-name="nameFieldName"
                :toggle-field-name="toggleFieldName"
                :description-field-name="descriptionFieldName"
                @modify="onModifyItem"
              />
            </v-col>
          </v-row>
        </v-layout>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import LoadingStatusView from '@/components/LoadingStatusView';
import GenericToggleBoardMixin from '@/core/component/toggleboard/mixins/GenericToggleBoardMixin';
import EmptyView from '@/core/component/common/EmptyView';
import GenericToggleBoardItem from '@/core/component/toggleboard/GenericToggleBoardItem';

export default {
  mixins: [GenericToggleBoardMixin],

  name: 'GenericToggleBoard',
  components: {GenericToggleBoardItem, EmptyView, LoadingStatusView},

  created() {
    this.load();
  },
};
</script>
