<template>
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xs="12">
      <div>
        <div class="row mx-2 my-1">
          <h2>{{ itemDisplayName }}</h2>

          <v-spacer />

          <GenericListNewItemDialog
            :error="error"
            :newItem="newItem"
            :fetching="fetching"
            :domainFields="domainFields"
            :itemDisplayName="itemDisplayName"
            :newItemDialogVisible="newItemDialogVisible"
            @apply="onClickDoneAddItem"
            @start-add="onClickAddItem"
            @cancel-add="onClickCancelAddItem"
            @form-update="onFormUpdate"
          />
        </div>

        <LoadingStatusView
          :error="error"
          :loading="fetching"
          skeleton-type="list-item-two-line, list-item-three-line, list-item-two-line, actions"
        />
        <EmptyView :error="error" :fetching="fetching" :all-items="allItems" :item-display-name="itemDisplayName" />

        <v-layout class="pl-6 pr-6 pt-0 pb-0" row>
          <v-row v-masonry item-selector=".item" transition-duration="0.3s">
            <v-col
              v-for="item in allItems"
              :key="item[keyName]"
              v-masonry-tile
              class="item pa-2"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
            >
              <GenericListItem
                :item="item"
                :domain-fields="domainFields"
                @input="onModifyItem"
                @apply="onClickApplyItem"
                @delete="onDelete"
                @start-modify="onClickModifyItem"
                @cancel-modify="onClickCancelModifyItem"
              />
            </v-col>
          </v-row>
        </v-layout>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import EmptyView from '@/core/component/common/EmptyView';
import GenericListItem from '@/core/component/list/GenericListItem';
import GenericListMixin from '@/core/component/list/mixins/GenericListMixin';
import LoadingStatusView from '@/core/component/common/LoadingStatusView';
import GenericListNewItemDialog from '@/core/component/list/GenericListNewItemDialog';

export default Vue.extend({
  mixins: [GenericListMixin],

  name: 'GenericList',
  components: {
    EmptyView,
    GenericListItem,
    LoadingStatusView,
    GenericListNewItemDialog,
  },

  mounted() {
    this.load();
  },
});
</script>