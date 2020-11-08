<template>
  <div>
    <!-- Title -->
    <div class="display-1 text--primary">{{ itemDisplayName }}</div>

    <!-- All item list -->
    <v-card v-for="item in allItems" :key="item.id"
            class="my-3" raised outlined :loading="item.loading">

      <!-- Contents -->
      <v-card-text>

        <!-- Number fields -->
        <div v-for="field in domainFields.filter((f) => f.type === 'number')" :key="field.name">
          {{ itemName }}.{{ field.name }}
          <v-text-field v-if="item.editing && field.mutable" type="number" v-model.number="item[field.name]" outlined @keydown="onModifyItem(item);"/>
          <p v-else class="display-1 text--primary">{{ item[field.name] }}</p>
        </div>

        <!-- Text fields -->
        <div v-for="field in domainFields.filter((f) => f.type === 'text')" :key="field.name">
          {{ itemName }}.{{ field.name }}
          <v-text-field v-if="item.editing && field.mutable" v-model="item[field.name]" outlined @keydown="onModifyItem(item);"/>
          <p v-else class="display-1 text--primary">{{ item[field.name] }}</p>
        </div>

        <!-- Bool fields -->
        <div v-for="field in domainFields.filter((f) => f.type === 'bool')" :key="field.name">
          {{ itemName }}.{{ field.name }}
          <v-switch :disabled="!(item.editing && field.mutable)" v-model="item[field.name]" outlined @change="onModifyItem(item);"/>
        </div>

      </v-card-text>

      <!-- Action -->
      <v-card-actions>
        <v-btn v-if="!item.editing && !item.loading" outlined text color="orange accent-4" @click="onClickModifyItem(item)">
          수정
        </v-btn>
        <v-btn v-if="item.editing" outlined text color="orange accent-4" @click="onClickCancelModifyItem(item)">
          취소
        </v-btn>
        <v-btn v-if="item.editing" outlined :disabled="!item.modified" text color="blue" @click="onClickApplyItem(item)">
          완료
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn v-if="item.editing" outlined text color="red" @click="onClickDeleteItem(item)">삭제</v-btn>

      </v-card-actions>

    </v-card>

    <!-- New item dialog -->
    <v-dialog v-model="newItemDialogVisible" persistent max-width="600">

      <template v-slot:activator="{ on, attrs }">
        <!-- Button -->
        <v-btn block v-bind="attrs" v-on="on" @click="onClickAddItem();">
          {{ itemDisplayName }} 추가
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <!-- Dialog content -->
      <v-card>
        <v-card-title class="headline">
          {{ itemDisplayName }} 추가
        </v-card-title>

        <v-card-text>

          <!-- Number fields -->
          <div v-for="field in domainFields.filter((f) => f.type === 'number')" :key="field.name">
            <v-text-field type="number" v-model.number="newItem[field.name]" outlined :label="itemName + '.' + field.name" @keydown="newItemFormValid = isNewItemFormValid()"/>
          </div>

          <!-- Text fields -->
          <div v-for="field in domainFields.filter((f) => f.type === 'text')" :key="field.name">
            <v-text-field v-model="newItem[field.name]" outlined :label="itemName + '.' + field.name" @keydown="newItemFormValid = isNewItemFormValid()"/>
          </div>

          <!-- Bool fields -->
          <div v-for="field in domainFields.filter((f) => f.type === 'bool')" :key="field.name">
            <v-switch v-model="newItem[field.name]" :label="itemName + '.' + field.name" @change="newItemFormValid = isNewItemFormValid()"/>
          </div>

          <v-btn :disabled="!newItemFormValid" block color="primary" @click="onClickDoneAddItem();">완료</v-btn>
          <p></p>
          <v-btn block @click="onClickCancelAddItem();">취소</v-btn>

        </v-card-text>

      </v-card>

    </v-dialog>

  </div>
</template>

<script>
import Field from '@/pages/home/features/cafeteria/Field';

export default {
  name: 'GenericList',

  props: {
    itemName: String,
    itemDisplayName: String,
    domainFields: Array[Field],

    initialItems: Array,
    itemGenerator: Function,

    formValidator: Function,
    onUpdate: Function,
  },

  data() {
    return {
      allItems: this.$props.initialItems,

      // Edit cache
      itemBeforeEdit: {},

      // New item form and data
      newItem: this.$props.itemGenerator(),
      newItemFormValid: false,
      newItemDialogVisible: false,
    }
  },

  methods: {
    onClickModifyItem(item) {
      this._backupItem(item);

      item.editing = true;
    },

    _backupItem(item) {
      this.itemBeforeEdit[item.id] = Object.assign({}, item);
    },

    onClickCancelModifyItem(item) {
      this._restoreItem(item);

      item.modified = false;
      item.editing = false;
    },

    _restoreItem(item) {
      Object.assign(item, this.itemBeforeEdit[item.id]);
    },

    onClickApplyItem(item) {
      item.editing = false;

      this.onUpdate(this.allItems);
    },

    onClickDeleteItem(item) {
      this.allItems.splice(this.allItems.indexOf(item), 1); // Deleting

      this.onUpdate(this.allItems);
    },

    onModifyItem(item) {
      item.modified = true;
    },

    onClickAddItem() {
      this.newItem = this.itemGenerator();
    },

    isNewItemFormValid() {
      return this.newItem.id
          && this.newItem.name
          && this.newItem.display_name;
    },

    onClickDoneAddItem() {
      this.newItemDialogVisible = false;
      this.newItem.loading = true;

      this.allItems.push(this.newItem);
      this.newItem = this.itemGenerator();

      this.onUpdate(this.allItems);
    },

    onClickCancelAddItem() {
      this.newItem = this.itemGenerator();
      this.newItemDialogVisible = false;
    }
  }
}

</script>

<style scoped>

</style>
