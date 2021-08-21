import Vue from 'vue';
import GenericMixin from '@/core/component/common/mixins/GenericMixin';
import BaseEntity from '@/core/entity/BaseEntity';

/**
 * GenericList의 CRUD 믹스인의 공통 부분입니다.
 */
export default Vue.extend({
  mixins: [GenericMixin],

  data() {
    return {
      itemGenerator: () => new this.$props.entityClass(),
      formValidator: (item, allItem) => {
        const idOfThisItem = Number.parseInt(item.id);
        if (isNaN(idOfThisItem)) {
          return true; // id가 없으면 통과!
        }

        const allIdsOfItems = allItem.map(i => i.id);

        const idIsDuplicated = allIdsOfItems.includes(idOfThisItem);

        return !idIsDuplicated;
      },

      // 편집한 내용을 저장하기 전에 잠시 백업하는 변수.
      itemBeforeEdit: {},

      // 폼에 사용할 새 아이템.
      newItem: new this.$props.entityClass(),
      newItemDialogVisible: false,
    };
  },

  methods: {
    redraw() {
      this.$nextTick(() => {
        this.$redrawVueMasonry();
      });
    },

    backupItem<T extends BaseEntity>(item: T) {
      this.itemBeforeEdit[item[this.keyName]] = Object.assign({}, item);
    },

    restoreItem<T extends BaseEntity>(item: T) {
      Object.assign(item, this.itemBeforeEdit[item[this.keyName]]);
    },

    isNewItemValid<T extends BaseEntity>(item: T) {
      const itemValid = this.isItemValid(item);
      const itemValidAsANewItem = this.formValidator(item, this.allItems);

      return itemValid && itemValidAsANewItem;
    },
  },
});