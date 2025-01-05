<script setup lang="ts">
import LogoIcon from '@/layouts/full/logo/LogoIcon.vue';
</script>

<template>
    <div class="bg-primary space-p-96 template position-relative overflow-hidden">
        <v-container class="max-width-1000">
            <div class="d-flex justify-center">
                <div class="round-56 d-flex justify-center align-center rounded-lg bg-surface elevation-4 lh-normal">
                    <LogoIcon />
                </div>
            </div>
            <h3 class="display-1 font-weight-bold text-center py-6">We have helped 500,000+ people, Like you.</h3>
            <div class="max-w-600 mx-auto">
                <p class="text-18 text-center">
                    Our has partnered with some of the most trusted brands in retail, technology, and Market Research to deliver a robust platform of earning opportunities.
                </p>
            </div>
            <div class="d-flex justify-center">
                <v-btn
                    class="mt-6 px-10 m-btn-full"
                    variant="outlined"
                    rounded="pill"
                    href="/auth/register"
                    color="white"
                    size="large"
                    flat
                    >Register</v-btn
                >
            </div>
        </v-container>
    </div>
</template>
