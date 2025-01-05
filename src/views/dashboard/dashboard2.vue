<script setup lang="ts">
import WelcomeCard from '@/components/dashboards/dashboard2/WelcomeCard.vue';
import TextCards from '@/components/dashboards/dashboard2/TextCards.vue';
import ProductSales from '@/components/dashboards/dashboard2/ProductSales.vue';
import TraficDistribution from '@/components/dashboards/dashboard2/TrafficDistribution.vue';
import PayingTable from '@/components/dashboards/dashboard2/PayingTable.vue';
import {  onMounted } from 'vue';

import { useStatisticsStore } from '@/stores/statistics/index';

const statistics = useStatisticsStore();


onMounted(() => {
    statistics.fetchList();
});
</script>

<template>
    <v-row>
        <!---Welcome cards-->
        <v-col cols="12" sm="12" lg="6">
            <WelcomeCard />
        </v-col>
        <!---Text cards-->
        <v-col cols="12" sm="12" lg="6" class="d-flex">
            <TextCards />
        </v-col>
        <!---Product Sales-->
        <v-col cols="12" sm="12" lg="8" class="d-flex">
            <ProductSales />
        </v-col>
        <!---Traffic distribution-->
        <v-col cols="12" sm="12" lg="4">
            <TraficDistribution />
        </v-col>
        <!---Paying Table-->
        <v-col cols="12" sm="12" lg="12">
            <PayingTable />
        </v-col>
    </v-row>
</template>
