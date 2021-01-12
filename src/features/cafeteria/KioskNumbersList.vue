<template>
  <GenericList v-bind="kioskNumbersProps"/>
</template>

<script>
import GenericList from '@/common/GenericList';
import KioskNumbers from '@/features/cafeteria/entities/KioskNumbers';
import kioskNumbersRepository from '@/features/cafeteria/data/KioskNumbersRepository';

export default {
  name: 'KioskList',
  components: {GenericList},

  data() {
    return {
      kioskNumbersProps: {
        keyName: 'cafeteria_id',
        itemName: 'cafeteria_kiosk_numbers',
        itemDisplayName: 'POS 번호',
        domainFields: KioskNumbers.fields(),

        itemGenerator: () => {
          return new KioskNumbers({});
        },
        formValidator: (kioskNumbers, allKioskNumbers) => {
          return !allKioskNumbers.find((c) => c.cafeteria_id === kioskNumbers.cafeteria_id); // should not exist.
        },

        onFetch: async () => kioskNumbersRepository.getAllKioskNumbers(),
        onAdd: async (item) => kioskNumbersRepository.addKioskNumbers(item),
        onUpdate: async (item) => kioskNumbersRepository.updateKioskNumbers(item),
        onDelete: async (item) => kioskNumbersRepository.deleteKioskNumbers(item)
      }
    };
  }
}
</script>

<style scoped>

</style>
