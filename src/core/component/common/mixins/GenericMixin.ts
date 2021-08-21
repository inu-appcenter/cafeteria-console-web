import Vue from 'vue';
import BaseEntity from '@/core/entity/BaseEntity';

/**
 * GenericXX 컴포넌트들에서 지겹게 반복되는 부분을 모아놓았습니다.
 */
export default Vue.extend({
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
      onDelete: entity => entity.save(),

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

    async showResult(resultPromise: Promise<boolean>, onSuccessMessage: string): Promise<boolean> {
      try {
        const result = await resultPromise;

        if (result) {
          this.$toasted.show(onSuccessMessage, {duration: 2000, icon: 'done'});
        } else {
          this.$toasted.show('요청을 처리하지 못 하였습니다', {duration: 2000, icon: 'warning'});
        }

        return result;
      } catch (e) {
        this.$toasted.show('심각한 문제가 발생하였습니다.', {
          duration: undefined,
          icon: 'error',
          action: [
            {text: '자세히', onClick: () => alert(e)},
            {text: '닫기', onClick: (e, toastObject) => toastObject.goAway(0)},
          ],
        });

        return false;
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