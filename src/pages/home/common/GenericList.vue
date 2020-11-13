<template>
  <div>
    <!-- Title -->
    <h2>{{ itemDisplayName }}</h2>

    <v-card v-for="item in allItems" :key="item[keyName]"
            class="my-3" raised outlined :loading="item.loading">

      <!-- All item list -->
      <v-list>

        <!-- Contents -->
        <v-list-item v-for="field in domainFields" :key="field.name">
          <!-- Field name -->
          <v-list-item-content>
            <v-list-item-title>{{ field.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ itemName }}.{{ field.name }}</v-list-item-subtitle>
          </v-list-item-content>

          <!-- Values -->
          <v-list-item-action>
            <!-- Number field -->
            <div v-show="field.type === 'number'">
              <v-text-field v-show="item.editing && field.mutable" type="number" v-model.number="item[field.name]"
                            outlined @input="onModifyItem(item);" :rules="[field.validate]"/>
              <div v-show="!(item.editing && field.mutable)" class="title">{{ item[field.name] }}</div>
            </div>

            <!-- Text field -->
            <div v-show="field.type === 'text'">
              <v-text-field v-show="item.editing && field.mutable" v-model="item[field.name]" outlined
                            @input="onModifyItem(item);" :rules="[field.validate]"/>
              <div v-show="!(item.editing && field.mutable)" class="title">{{ item[field.name] }}</div>
            </div>

            <!-- Bool field -->
            <div v-show="field.type === 'bool'">
              <v-switch :disabled="!(item.editing && field.mutable)" v-model="item[field.name]" outlined
                        @change="onModifyItem(item);"/>
            </div>

          </v-list-item-action>
        </v-list-item>

      </v-list>

      <!-- Action -->
      <v-card-actions>
        <v-btn v-if="!item.editing && !item.loading" outlined text color="orange accent-4"
               @click="onClickModifyItem(item)">
          수정
        </v-btn>
        <v-btn v-if="item.editing" outlined text color="orange accent-4" @click="onClickCancelModifyItem(item)">
          취소
        </v-btn>
        <v-btn v-if="item.editing" outlined :disabled="!(item.valid && item.modified)" text color="blue"
               @click="onClickApplyItem(item)">
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
            <v-text-field v-if="field.type === 'number'" type="number" v-model.number="newItem[field.name]" outlined
                          :label="itemName + '.' + field.name" @input="onFormUpdate();" :rules="[field.validate]"/>

            <!-- Text field -->
            <v-text-field v-else-if="field.type === 'text'" v-model="newItem[field.name]" outlined
                          :label="itemName + '.' + field.name" @input="onFormUpdate();" :rules="[field.validate]"/>

            <!-- Bool field -->
            <v-switch v-else-if="field.type === 'bool'" v-model="newItem[field.name]"
                      :label="itemName + '.' + field.name" @input="onFormUpdate();" :rules="[field.validate]"/>
          </div>

          <v-btn :disabled="!newItem.valid" block color="primary" @click="onClickDoneAddItem();">완료</v-btn>
          <p></p>
          <v-btn block @click="onClickCancelAddItem();">취소</v-btn>

        </v-card-text>

      </v-card>

    </v-dialog>

  </div>
</template>

<script>
import Field from '@/pages/home/common/Field';

export default {
  name: 'GenericList',

  props: {
    keyName: String,
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
      newItemDialogVisible: false,
    }
  },

  methods: {
    onClickModifyItem(item) {
      this._backupItem(item);

      item.editing = true;
    },

    _backupItem(item) {
      this.itemBeforeEdit[item[this.$props.keyName]] = Object.assign({}, item);
    },

    onClickCancelModifyItem(item) {
      this._restoreItem(item);

      item.modified = false;
      item.editing = false;
    },

    _restoreItem(item) {
      Object.assign(item, this.itemBeforeEdit[item[this.$props.keyName]]);
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
      item.valid = this._isItemValid(item);
      item.modified = true;
    },

    onClickAddItem() {
      this.newItem = this.itemGenerator();
    },

    onFormUpdate() {
      this.newItem.valid = this._isNewItemValid(this.newItem);
    },

    _isItemValid(item) {
      for (const field of this.$props.domainFields) {
        // Result should be pure 'true'.
        if (field.validate(item[field.name]) !== true) {
          console.log(item[field.name]);
          return false;
        }
      }

      return true;
    },

    _isNewItemValid(item) {
      return this._isItemValid(item) && this.$props.formValidator(item, this.allItems);
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
