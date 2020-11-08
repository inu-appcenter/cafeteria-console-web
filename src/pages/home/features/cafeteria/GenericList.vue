<template>
  <div>
    <!-- Title -->
    <div class="display-1 text--primary">{{ itemDisplayName }}</div>

    <!-- All item list -->
    <v-card v-for="item in allItems" :key="item.id"
            class="my-3" raised outlined :loading="item.loading">

      <!-- Contents -->
      <v-card-text>

        <!-- Fields -->
        <div v-for="field in domainFields" :key="field.name">

          <!-- Field name -->
          {{ itemName }}.{{ field.name }}

          <!-- Number field -->
          <div v-if="field.type === 'number'">
            <v-text-field v-if="item.editing && field.mutable" type="number" v-model.number="item[field.name]" outlined @keydown="onModifyItem(item);"/>
            <p v-else class="display-1 text--primary">{{ item[field.name] }}</p>
          </div>

          <!-- Text field -->
          <div v-else-if="field.type === 'text'">
            <v-text-field v-if="item.editing && field.mutable" v-model="item[field.name]" outlined @keydown="onModifyItem(item);"/>
            <p v-else class="display-1 text--primary">{{ item[field.name] }}</p>
          </div>

          <!-- Bool field -->
          <div v-else-if="field.type === 'bool'">
            <v-switch :disabled="!(item.editing && field.mutable)" v-model="item[field.name]" outlined @change="onModifyItem(item);"/>
          </div>

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

        <!-- Add button -->
        <v-btn block v-bind="attrs" v-on="on" @click="onClickAddItem();">
          {{ itemDisplayName }} 추가
          <v-icon>mdi-plus</v-icon>
        </v-btn>

      </template>

      <!-- Dialog content -->
      <v-card>

        <!-- Title -->
        <v-card-title class="headline">
          {{ itemDisplayName }} 추가
        </v-card-title>

        <!-- Contents -->
        <v-card-text>

          <!-- Fields -->
          <div v-for="field in domainFields" :key="field.name">

            <!-- Number field -->
            <v-text-field v-if="field.type === 'number'" type="number" v-model.number="newItem[field.name]" outlined :label="itemName + '.' + field.name" @keydown="onFormUpdate();"/>

            <!-- Text field -->
            <v-text-field v-else-if="field.type === 'text'" v-model="newItem[field.name]" outlined :label="itemName + '.' + field.name" @keydown="onFormUpdate();"/>

            <!-- Bool field -->
            <v-switch v-else-if="field.type === 'bool'" v-model="newItem[field.name]" :label="itemName + '.' + field.name" @change="onFormUpdate();"/>
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

    onFormUpdate() {
      this.newItemFormValid = this.$props.formValidator(this.newItem, this.allItems);
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
