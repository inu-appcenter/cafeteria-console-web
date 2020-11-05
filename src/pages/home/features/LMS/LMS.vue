<template>
    <v-container fluid>

        <!-- Clips -->
        <v-row justify="center">
            <v-col cols="12" lg="4">
                <Clips/>
            </v-col>
        </v-row>

        <!-- Assignments -->
        <v-row justify="center">
            <v-col cols="12" lg="4">
                <Assignments/>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import Clips from './Clips';
    import Assignments from './Assignments';

    export default {
        name: 'LMS',
        components: {Assignments, Clips},
    }
</script>

<style scoped>

</style>
