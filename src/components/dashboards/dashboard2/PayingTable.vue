<script setup lang="ts">
import {  onMounted, computed } from 'vue';
import { useStatisticsStore } from '@/stores/statistics/index';
import profile5 from '@/assets/images/profile/user6.jpg';
import { formatCurrency } from '@/utils/helpers/index';

const statistics = useStatisticsStore();

const rankList: any = computed(() => {
    return statistics.rank;
});

onMounted(() => {
    statistics.fetchRank();
});
</script>
<template>
    <VCard elevation="10">
        <v-card-text>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <h5 class="text-h5 mb-1 font-weight-semibold">Top Employees</h5>
                </div>
            </div>
            <div class="month-table">
                <v-table class="mt-5 mb-0">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-subtitle-1 font-weight-semibold text-grey200 text-no-wrap">No</th>
                                <th class="text-subtitle-1 font-weight-semibold text-grey200 text-no-wrap">User</th>
                                <th class="text-subtitle-1 font-weight-semibold text-grey200 text-no-wrap">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in rankList" :key="item.name" class="month-item">
                                <td>
                                    <div class="d-flex align-center">
                                        <v-avatar size="50">
                                            <img :src="profile5" alt="user" width="50" />
                                        </v-avatar>
                                        <div class="mx-4">
                                            <h4 class="text-subtitle-1 font-weight-bold text-no-wrap text-grey200">NO {{ index + 1 }}</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5 class="text-subtitle-1 font-weight-medium text-no-wrap text-grey200">
                                        {{ item.name }}
                                    </h5>
                                </td>
                                <td>
                                    <h5
                                        class="text-subtitle-1 font-weight-medium text-no-wrap"
                                        :class="{ 'text-primary': index < 3 }"
                                    >
                                        {{ formatCurrency(item.pay) }}
                                    </h5>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-table>
            </div>
        </v-card-text>
    </VCard>
</template>
