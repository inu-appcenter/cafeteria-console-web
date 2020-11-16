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

          <v-form ref="newItemForm" @submit.prevent="onClickDoneAddItem();">
            <!-- Fields -->
            <div v-for="field in domainFields" :key="field.name">

              <!-- Number field -->
              <v-text-field v-show="field.type === 'number'" type="number" v-model.number="newItem[field.name]" outlined
                            :label="itemName + '.' + field.name" @input="onFormUpdate();" :rules="[field.validate]"/>

              <!-- Text field -->
              <v-text-field v-show="field.type === 'text'" v-model="newItem[field.name]" outlined
                            :label="itemName + '.' + field.name" @input="onFormUpdate();" :rules="[field.validate]"/>

              <!-- Bool field -->
              <v-switch v-show="field.type === 'bool'" v-model="newItem[field.name]"
                        :label="itemName + '.' + field.name" @input="onFormUpdate();" :rules="[field.validate]"/>
            </div>

            <v-btn type="submit" :disabled="!newItem.valid" block color="primary">완료</v-btn>
            <p></p>
            <v-btn block @click="onClickCancelAddItem();">취소</v-btn>

          </v-form>

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

    itemGenerator: Function,
    formValidator: Function,

    onFetch: Function,
    onAdd: Function,
    onUpdate: Function,
    onDelete: Function
  },

  data() {
    return {
      allItems: [],

      // Edit cache
      itemBeforeEdit: {},

      // New item form and data
      newItem: this.$props.itemGenerator(),
      newItemDialogVisible: false,
    }
  },

  created() {
    this.load();
  },

  watch: {
    newItemDialogVisible() {
      this.$nextTick(() => {
        this.$refs.newItemForm.resetValidation();
      });
    }
  },

  methods: {
    load() {
      this.onFetch().then((items) => {
        this.allItems = items;
      });
    },

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

    async onClickApplyItem(item) {
      item.editing = false;

      item.loading = true;
      await this.onUpdate(item);
      item.loading = false;
    },

    async onClickDeleteItem(item) {
      item.loading = true;
      await this.onDelete(item);
      item.loading = false;

      this.allItems.splice(this.allItems.indexOf(item), 1); // Deleting
    },

    onModifyItem(item) {
      item.valid = this._isItemValid(item);
      item.modified = true;
    },

    onClickAddItem() {
      this.newItem = this.itemGenerator();
      console.log(this.newItem);
    },

    onFormUpdate() {
      this.newItem.valid = this._isNewItemValid(this.newItem);
    },

    _isItemValid(item) {
      for (const field of this.$props.domainFields) {
        // Result should be pure 'true'.
        if (field.validate(item[field.name]) !== true) {
          return false;
        }
      }

      return true;
    },

    _isNewItemValid(item) {
      const itemValid = this._isItemValid(item);
      const itemValidAsANewItem = this.$props.formValidator(item, this.allItems);

      return itemValid && itemValidAsANewItem;
    },

    async onClickDoneAddItem() {
      this.newItemDialogVisible = false;

      this.allItems.push(this.newItem);

      this.newItem.loading = true;
      await this.onAdd(this.newItem);
      this.newItem.loading = false;
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
