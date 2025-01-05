<script setup lang="ts">
import {  computed } from 'vue';
import { Icon } from '@iconify/vue';
import {formatCurrency, describeGrowthRate} from '@/utils/helpers/index'
import shape1 from '@/assets/images/svgs/warning-shap.svg';
import { useStatisticsStore } from '@/stores/statistics/index';

const store = useStatisticsStore();

const statistics: any = computed(() => {
    return store.statistics || {};
});
</script>
<template>
    <v-row class="d-flex">
        <v-col cols="12" sm="4" class="d-flex">
            <v-card elevation="10" color="primary">
                <v-card-text class="pl-5 pr-7 pt-5 pb-5">
                    <img :src="shape1" alt="shape" class="shape" />
                    <Icon icon="solar:ruble-linear" width="30" height="30" class="mb-2" />
                    <h5 class="text-h4 font-weight-semibold text-white">{{ formatCurrency(statistics?.time_data?.day) }}</h5>
                    <span class="text-subtitle-2 pl-1">{{ describeGrowthRate(statistics?.time_data?.last_day,statistics?.time_data?.day) }}</span>
                    <p class="text-subtitle-1 pt-1 opacity-50 font-weight-medium">Today</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex">
            <v-card elevation="10" color="primary">
                <v-card-text class="pl-5 pr-7 pt-5 pb-5">
                    <img :src="shape1" alt="shape" class="shape" />
                    <Icon icon="solar:ruble-linear" width="30" height="30" class="mb-2" />
                    <h5 class="text-h4 font-weight-semibold text-white">{{ formatCurrency(statistics?.time_data?.week) }}</h5>
                    <span class="text-subtitle-2 pl-1">{{ describeGrowthRate(statistics?.time_data?.last_week,statistics?.time_data?.week) }}</span>
                    <p class="text-subtitle-1 pt-1 opacity-50 font-weight-medium">Week</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex">
            <v-card elevation="10" color="primary">
                <v-card-text class="pl-5 pr-7 pt-5 pb-5">
                    <img :src="shape1" alt="shape" class="shape" />
                    <Icon icon="solar:ruble-linear" width="30" height="30" class="mb-2" />
                    <h5 class="text-h4 font-weight-semibold text-white">{{ formatCurrency(statistics?.time_data?.month) }}</h5>
                    <span class="text-subtitle-2 pl-1">{{ describeGrowthRate(statistics?.time_data?.last_month,statistics?.time_data?.month) }}</span>
                    <p class="text-subtitle-1 pt-1 opacity-50 font-weight-medium">Month</p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<style scoped>
.shape {
    position: absolute;
    right: 0;
    top: 0px;
}
</style>
