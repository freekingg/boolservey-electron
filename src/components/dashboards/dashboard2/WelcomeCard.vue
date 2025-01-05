<script setup lang="ts">
import {  computed } from 'vue';
import { useStatisticsStore } from '@/stores/statistics/index';
import { formatCurrency } from '@/utils/helpers/index';

const store = useStatisticsStore();
const statistics: any = computed(() => {
    return store.statistics;
});
</script>
<template>
    <v-card elevation="10" class="overflow-visible">
        <v-card-text class="position-relative pb-5">
            <h5 class="text-h5 mb-1 font-weight-semibold">Welcome To Bool Surver</h5>
            <div class="text-subtitle-1 text-grey100 pb-1">Check all the statastics</div>
            <v-btn color="primary" class="mt-4 mb-2 px-7" rounded="pill" size="large">
                总积分: {{ formatCurrency(statistics?.time_data.count) }}
            </v-btn>
        </v-card-text>
        <img src="@/assets/images/backgrounds/school.png" class="bg-img-1 mt-sm-0 mt-sm-n10" />
    </v-card>
</template>

<style scoped>
.overlay-title {
    position: relative;
    z-index: 1;
}
.bg-img-1 {
    position: absolute;
    bottom: 0;
    right: -30px;
}
@media screen and (max-width: 600px) {
    .bg-img-1 {
        position: unset;
    }
}
</style>
