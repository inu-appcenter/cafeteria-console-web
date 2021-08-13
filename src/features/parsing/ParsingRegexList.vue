<template>
  <GenericList v-bind="parsingRegexProps" />
</template>

<script>
import GenericList from '@/core/component/list/GenericList';
import MenuParseRegex from '@/features/parsing/MenuParseRegex';

export default {
  name: 'ParsingRegexList',
  components: {GenericList},

  data() {
    return {
      parsingRegexProps: {
        entityClass: MenuParseRegex,
      },
    };
  },
};
</script>
