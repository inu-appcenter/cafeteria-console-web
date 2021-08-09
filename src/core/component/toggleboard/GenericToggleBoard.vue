<template>
  <!-- Layout wrapper -->
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xl="12" xs="12">
      <!-- The content -->
      <div>
        <!-- Title -->
        <div class="mx-2 my-1">
          <h2>{{ itemDisplayName }}</h2>
        </div>

        <!-- Loading status -->
        <LoadingStatusView :error="error" :loading="fetching" skeleton-type="list-item-three-line" />

        <div
          v-show="!fetching && !error && allItems.length === 0"
          class="empty-view-div font-weight-bold text--secondary"
        >
          {{ emptyText || itemDisplayName + '이(가) 없습니다.' }}
        </div>

        <!-- Masonry holder -->
        <v-layout class="pl-6 pr-6 pt-0 pb-0" row>
          <v-row v-masonry item-selector=".item" transition-duration="0.3s">
            <v-col
              v-for="(item, index) of allItems"
              :key="item['keyName']"
              v-masonry-tile
              class="item pa-2"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
            >
              <!-- Both the board item and the popup bound to it are inside here -->
              <v-dialog v-model="detailsDialogVisible[index]" max-width="600px">
                <!-- The board content -->
                <template v-slot:activator="{on, attrs}">
                  <!-- Item cards -->
                  <v-card v-bind="attrs" v-on="on" :loading="item.loading" outlined raised>
                    <v-list three-line>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ item[nameFieldName] }}</v-list-item-title>
                          <v-list-item-subtitle>{{ item[descriptionFieldName] }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-switch v-model="item[toggleFieldName]" @change="onModifyItem(item)" />
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </template>

                <!-- The dialog content (shown when the board clicked) -->
                <v-card raised>
                  <v-list three-line>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title style="white-space: normal">{{ item[nameFieldName] }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item[descriptionFieldName] }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-dialog>
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

export default {
  mixins: [GenericToggleBoardMixin],

  name: 'GenericToggleBoard',
  components: {LoadingStatusView},

  created() {
    this.load();
  },
};
</script>
