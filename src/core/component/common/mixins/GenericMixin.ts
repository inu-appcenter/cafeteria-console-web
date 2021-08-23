import Vue from 'vue';
import BaseEntity from '@/core/entity/BaseEntity';
import ApiMixin from '@/core/component/common/mixins/ApiMixin';

/**
 * GenericXX 컴포넌트들에서 지겹게 반복되는 부분을 모아놓았습니다.
 */
export default Vue.extend({
  mixins: [ApiMixin],

  props: {
    // GenericXX 컴포넌트들에서는 BaseEntity를 기본적으로 사용합니다. 필수!
    entityClass: {
      type: Function, // 사실 함수 아니고 BaseEntity의 생성자...
      required: false,
    },
  },

  data() {
    const entityClass = this.$props.entityClass;
    const meta = entityClass.metadata();

    return {
      meta,

      keyName: 'id',
      itemName: meta.name,
      itemDisplayName: meta.displayName,
      domainFields: meta.fields,

      onFetch: () => entityClass.find(),
      onAdd: entity => entity.save(),
      onUpdate: entity => entity.save(),
      onDelete: entity => entity.remove(),

      allItems: [],
      fetching: false,
      error: null,
    };
  },

  methods: {
    async load(): Promise<void> {
      console.log('Fetch 시작!');
      this.fetching = true;

      try {
        console.log('Fetch 성공!');
        this.allItems = await this.onFetch();
      } catch (e) {
        console.log(`Fetch 망함!!! ${e.message}`);
        this.error = e;
      } finally {
        console.log('Fetch 종료!');
        this.fetching = false;
      }
    },

    isItemValid<T extends BaseEntity>(item: T) {
      for (const field of this.domainFields) {
        // Result should be pure 'true'.
        if (field.validate(item[field.name]) !== true) {
          return false;
        }
      }

      return true;
    },
  },
});
