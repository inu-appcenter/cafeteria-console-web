<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" lg="3">
                <v-card :loading="loading">
                    <v-card-title class="justify-center">Sign Up</v-card-title>

                    <v-stepper v-model="step">
                        <v-stepper-header>
                            <v-stepper-step :complete="step > 1" step="1">Validate</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="step > 2" step="2">Enter password</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3">Finish</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <!-- invitation form -->
                                <v-flex>
                                    <v-card-text>
                                        Submit your invitation code sent from slack.

                                        <v-form ref="form_invitation" v-model="valid">
                                            <v-text-field
                                                    type="text"
                                                    v-model="invitation"
                                                    :rules="invitationRules"
                                                    label="Invitation"
                                                    required
                                            ></v-text-field>
                                        </v-form>

                                        <div v-if="errorMessage.length" class="red--text">
                                            {{ errorMessage }}
                                        </div>
                                    </v-card-text>
                                    <v-card-text>
                                        <v-btn :disabled="!valid" @click="submitInvitation" width="100%">
                                            Proceed
                                        </v-btn>
                                    </v-card-text>
                                </v-flex>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <!-- sign up form -->
                                <v-flex >
                                    <v-card-text>
                                        <div>User ID: {{ userId }}</div>
                                        <div>Slack user ID: {{ slackUserId }}</div>

                                        <v-form ref="form_sign_up" v-model="valid">
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
                                    <v-card-text>
                                        <v-btn :disabled="!valid" @click="signUp" width="100%">
                                            Complete sign up
                                        </v-btn>
                                    </v-card-text>
                                </v-flex>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-flex >
                                    <v-card-text>
                                        <div class="title">Sign up completed.</div>
                                        <a href="/auth/sign-in">Click here to sign in</a>
                                    </v-card-text>
                                </v-flex>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'SignUp',

        data: function() {
            return {
                step: 1,

                valid: false,
                loading: false,
                errorMessage: '',
                invitationValid: false,

                userId: 'No user id',
                slackUserId: 'No slack user id',

                invitation: null,
                invitationRules: [
                    (v) => !!v || 'Invitation is required',
                ],

                password: null,
                passwordRules: [
                    (v) => !!v || 'Password is required',
                ],
            }
        },
        methods: {
            async submitInvitation() {
                this.loading = true;

                await new Promise((resolve) => {
                    setTimeout(() => resolve(), 1000);
                });

                this.loading = false;

                this.userId = '202099999';
                this.slackUserId = 'adadaed';

                this.invitationValid = true;
                this.step = 2;
            },

            async signUp() {
                this.loading = true;

                await new Promise((resolve) => {
                    setTimeout(() => resolve(), 1000);
                });

                this.loading = false;

                this.step = 3;
            },
        }
    }
</script>

<style scoped>

</style>
