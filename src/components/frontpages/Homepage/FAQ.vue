<script setup lang="ts">
import { FAQData } from '@/_mockApis/front-pages/PagesData';
</script>
<template>
    <div class="space-p-96 lp-faq">
        <v-container class="max-width-800 py-0">
            <div class="text-center mb-8">
                <h3 class="display-2 font-weight-bold textPrimary">Frequently asked questions</h3>
            </div>
            <v-expansion-panels elevation="0" class="mt-14 d-flex flex-column ga-4">
                <v-expansion-panel elevation="0" class="border" v-for="item in FAQData" :key="item.title">
                    <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus" class="text-18 font-weight-semibold textPrimary py-5">{{
                        item.title
                    }}</v-expansion-panel-title>

                    <v-expansion-panel-text class="text-16 text-grey100">
                        {{ item.subtitle }}
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>
