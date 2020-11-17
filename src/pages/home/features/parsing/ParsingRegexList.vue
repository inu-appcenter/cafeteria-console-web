<template>
  <GenericList v-bind="parsingRegexProps" />
</template>

<script>
import GenericList from '@/pages/home/common/GenericList';
import ParseRegex from '@/pages/home/features/parsing/entities/ParseRegex';
import parseRegexRepository from '@/pages/home/features/parsing/data/ParseRegexRepository';

export default {
  name: 'ParsingRegexList',
  components: {GenericList},

  data() {
    return {
      parsingRegexProps: {
        keyName: 'id',
        itemName: 'parse_regex',
        itemDisplayName: '파싱 정규식',
        domainFields: ParseRegex.fields(),

        itemGenerator: () => {
          return new ParseRegex({});
        },
        formValidator: (parseRegex, allParseRegex) => {
          return !allParseRegex.find((r) => r.id === parseRegex.id); // should not exist.
        },

        onFetch: async () => parseRegexRepository.getAllParesRegexes(),
        onAdd: async (item) => parseRegexRepository.addParseRegex(item),
        onUpdate: async (item) => parseRegexRepository.updateParseRegex(item),
        onDelete: async (item) => parseRegexRepository.deleteParseRegex(item)
      }
    }
  }
}
</script>

<style scoped>

</style>
