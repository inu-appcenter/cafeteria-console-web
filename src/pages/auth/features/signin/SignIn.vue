<template>
    <v-container fill-height fluid>
        <v-row>
            <v-col>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="12" lg="3">
                            <v-card :loading="loading">

                                <!-- titles -->
                                <v-card-title class="justify-center">Sign In</v-card-title>

                                <!-- form -->
                                <v-card-text>
                                    <v-form ref="form" v-model="valid">
                                        <v-text-field
                                                type="text"
                                                v-model="userId"
                                                :rules="userIdRules"
                                                label="ID"
                                                required
                                        ></v-text-field>
                                        <v-text-field
                                                type="password"
                                                v-model="password"
                                                :rules="passwordRules"
                                                label="Password"
                                                required
                                        ></v-text-field>
                                    </v-form>

                                    <div v-if="errorMessage.length" class="red--text">
                                        {{ errorMessage }}
                                    </div>
                                </v-card-text>

                                <!-- submit -->
                                <v-card-text>
                                    <v-btn :disabled="!valid" @click="signIn" width="100%">
                                        Sign In
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row align="center" justify="center">
                        <v-col cols="12" lg="3">
                            <div class="text--secondary text-center mb-2">Not a member?</div>
                            <v-btn width="100%" to="/auth/sign-up">Sign Up</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'SignIn',

        data: () => ({
            valid: false,
            loading: false,
            errorMessage: '',

            userId: null,
            userIdRules: [
                (v) => !!v || 'ID is required',
            ],

            password: null,
            passwordRules: [
                (v) => !!v || 'Password is required',
            ],
        }),
        methods: {
            async signIn() {
                if (!this.$refs.form.validate()) {
                    return;
                }

                this.loading = true;

                await new Promise((resolve) => {
                    setTimeout(() => resolve(), 1000);
                });
                this.errorMessage = 'Wrong password!';

                this.loading = false;
            },
        },
    };
</script>

<style scoped>

</style>
