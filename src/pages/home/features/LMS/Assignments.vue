<template>
    <div>
        <div class="display-1 text--primary">Assignments</div>
        <v-card v-for="assignment in assignments" :key="assignment.id"
                class="my-3" raised ripple>

            <!-- Texts -->
            <v-card-text>
                {{ assignment.course }}
                <p class="display-1 text--primary">{{ assignment.title }}</p>
                {{ assignment.due }}
            </v-card-text>

        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'Assignments',

        data: () => ({
            assignments: [
                {
                    id: 2345,
                    course: '비판적사고력연습',
                    title: '8주차 출석 확인',
                    due: '2020년 5월 1일 8시 30분 ~ 2020년 5월 8일 19시 30분',
                },
                {
                    id: 2345,
                    course: '구구내면의명령',
                    title: '푹 자기',
                    due: '2020년 5월 1일 8시 30분 ~ 2020년 5월 8일 19시 30분',
                },
            ],
        }),
    };
</script>

<style scoped>

</style>
